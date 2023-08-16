"""
This file generates a csv file of test cases for the shift and rotate operations
of the 16 trit balanced ternary number system. The test cases are random and 
the different wrap around behaviors required of the shifter/rotater unit.
Note that on the system, the busses are stored with the most significant 
trits at the end of the data busses, so that these operations appear to be 
reversed. We adopt the convention here such that on the system, a left shift 
advances bits of lower significance to higher significance, and the opposite.
"""

import csv
import random

# Test data file name
TEST_FILE = "test/shift_rot_test.csv"

# System word size
WORD_SIZE = 16

# System max value based on word size
MAX_VAL = sum([3 ** i for i in range(WORD_SIZE)])

# Number of random cases to add for each operation
RAND_CASES = 100


def rshift(input):
    """
    Shifts the input to the right by one trit. The rightmost trit is discarded
    and a 0 is added to the left.
    """
    return input[1:] + ["0"]


def rrot(input):
    """
    Rotates the input to the right by one trit. The rightmost trit is moved to
    the leftmost position.
    """
    return input[1:] + [input[0]]


def lshift(input):
    """
    Shifts the input to the left by one trit. The leftmost trit is discarded
    and a 0 is added to the right.
    """
    return ["0"] + input[:-1]


def lrot(input):
    """
    Rotates the input to the left by one trit. The leftmost trit is moved to
    the rightmost position.
    """
    return [input[-1]] + input[:-1]


def gen_rand_case():
    """
    Generates a random case for the shift/rot operations. The case is a list of
    trits represented as strings.
    """
    characters = ['1', '0', '-1']
    random_string = [random.choice(characters) for _ in range(WORD_SIZE)]
    return random_string


def gen_op():
    """
    Generates a list of random cases a shift/rot operation. The cases are
    lists of trits represented as lists of characters
    """
    cases = []
    for _ in range(RAND_CASES):
        cases.append(gen_rand_case())
    return cases


def gen_cases():
    """
    Generates a list of random cases for each shift/rot operation. The cases
    are lists of trits represented as lists of characters
    """
    return (gen_op() for _ in range(4))


if __name__ == "__main__":
    # Generate the random test inputs
    ls_cases, rs_cases, lr_cases, rr_cases = gen_cases()
    with open(TEST_FILE, 'w') as csvfile:
        # Write the test cases to the csv file at the specified path
        writer = csv.writer(csvfile, escapechar=',', quoting = csv.QUOTE_NONE)
        writer.writerow(["input", "operation", "result"])
        # Write the test cases with calculated results for each operation
        for case in ls_cases:
            writer.writerow(["".join(case), "<<<", "".join(lshift(case))])
        for case in rs_cases:
            writer.writerow(["".join(case), ">>>", "".join(rshift(case))])
        for case in lr_cases:
            writer.writerow(["".join(case), "<<", "".join(lrot(case))])
        for case in rr_cases:
            writer.writerow(["".join(case), ">>", "".join(rrot(case))])
