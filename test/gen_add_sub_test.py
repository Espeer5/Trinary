"""
This file generates a csv file of test cases for the add and sub operations
of the 16 trit balanced ternary number system. The test cases are a mix of
basic, necessary cases and random cases.
"""

import csv
import random

# Test data file name
TEST_FILE = "test/add_sub_test.csv"

# number of random cases to add for each operation
RAND_CASES = 100

# System word size being used
WORD_SIZE = 16

MAX_VAL = sum([3 ** i for i in range(WORD_SIZE)])
MIN_VAL = -MAX_VAL

ADD_CASES = {
    #basic, necessary tests
    (0, 0):0,
    (1, 0):1,
    (0, 1):1,
    (1, 1):2,
    (0, -1): -1,
    (-1, 0): -1,
    (-1, -1): -2,
    (1, -1): 0,
    
    #some edge cases
    (MAX_VAL, 1): -MAX_VAL,
    (-MAX_VAL, -1): MAX_VAL,
    (1, MAX_VAL): -MAX_VAL,
    (-1, -MAX_VAL): MAX_VAL,
    (MAX_VAL, -1): MAX_VAL - 1,
    (-MAX_VAL, 1): -MAX_VAL + 1
}

SUB_CASES = {
    #basic, necessary tests
    (0, 0): 0,
    (0, 1): -1,
    (1, 0): 1,
    (1, 1): 0,
    (0, -1): 1,
    (-1, 0): -1,
    (-1, -1): 0,
    (-1, 1): -2,
    (1, -1): 2,

    #Some edge cases
    (MAX_VAL, -1): 0,
    (MAX_VAL, 1): MAX_VAL - 1,
    (-MAX_VAL, -1): -MAX_VAL + 1,
    (-1, MAX_VAL): MAX_VAL,
    (1, -MAX_VAL): -MAX_VAL,
}

def gen_nums():
    """ Generates 2 random decimal numbers in the range of the max/min 16 trit 
        balanced ternary number
    """
    return (random.randrange(-MAX_VAL / 2, MAX_VAL / 2), random.randrange(-MAX_VAL / 2, MAX_VAL / 2))


def rand_add(dict):
    """ Generates a random test case of adding two 16 trit ternary numbers
    """
    num1, num2 = gen_nums()
    dict[(num1, num2)] = num1 + num2


def rand_sub(dict):
    """ Generates a random test case of subtracting two 16 trit ternary numbers
    """
    num1, num2 = gen_nums()
    dict[(num1, num2)] = num1 - num2


def form_cases(num_rand):
    """ Updates the dictionaries of set test cases for each operation with 
    additional random test case
    """
    for _ in range(num_rand):
        rand_add(ADD_CASES)
        rand_sub(SUB_CASES)


def format_write():       
    """ Formates the test cases created above to be written to the csv data file
    """ 
    toWrite = []
    toWrite += [{"value1":case[0], "value2": case[1], "operation": "+", "result":ADD_CASES[case]} for case in ADD_CASES]
    toWrite += [{"value1":case[0], "value2": case[1], "operation": "-", "result":ADD_CASES[case]} for case in ADD_CASES]
    return toWrite


def collect_cases():
    """ Forms all test cases and formats them to be written to csv
    """
    form_cases(RAND_CASES)
    return format_write()


if __name__ == "__main__":
    # Create all the test cases
    toWrite = collect_cases()
    # Create the data file
    with open(TEST_FILE, 'w') as data_file:
        writer = csv.DictWriter(data_file, fieldnames=["value1", "value2", "operation", "result"])
        writer.writeheader()
        # Write all test cases to the data file
        writer.writerows(toWrite)