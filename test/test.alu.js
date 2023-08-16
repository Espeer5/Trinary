import { CPU } from "../src/CPU/cpu.js";
import { Tri } from "../src/representation/tri.js";
import { wordToDec, decimalToBalancedTernary } from "../src/TriArithmetic/conversions.js";
import assert from "assert";
import { WORD_SIZE } from "../src/constants.js";
import fs from "fs";
import csvParser from 'csv-parser';
import { Word } from "../src/representation/word.js";

// Import paths for test data for each alu module
const AddSubPath = 'test/add_sub_test.csv';
const ShiftRotPath = 'test/shift_rot_test.csv';

// Creates an array of tris from an array of 1s, 0s, and -1s for specifying 
// the ALU instruction
const create_sig = (sig) => {
    let sig_arr = [];
    for (let i = 0; i < 6; i++) {
        sig_arr[i] = new Tri();
        sig_arr[i].setState(sig[i]);
    }
    return sig_arr;
}

// Instantiate the CPU
const cpu = new CPU();

// Map of ALU instructions to their corresponding array of instruction tris
const sigMap = {
    "+" : create_sig([1, -1, -1, 0, -1, -1]),
    "-" : create_sig([-1, -1, -1, 0, -1, -1]),
    "<<": create_sig([0, -1, -1, 1, -1, 1]),
    ">>": create_sig([0, -1, -1, 1, 0, -1]),
    ">>>": create_sig([0, -1, -1, 1, -1, 0]),
    "<<<": create_sig([0, -1, -1, 1, -1, -1]),
}

// Read the test data from the csv file and run the tests for add/subtract
const runAddSub = async () => {
  const test_data = [];

  try {
    const stream = fs.createReadStream(AddSubPath).pipe(csvParser());

    for await (const row of stream) {
      test_data.push(row);
    }

    describe("Add/Sub Tests", function () {
        it("tests add/sub correctness for ALU", function () {
          for (let i = 0; i < test_data.length; i++) {
            cpu.alu.inputs[0].writeBus(decimalToBalancedTernary(
                               parseInt(test_data[i].value1)));
            cpu.alu.inputs[1].writeBus(decimalToBalancedTernary(
                                parseInt(test_data[i].value2)));
            cpu.alu.writeInstruction(sigMap[test_data[i].operation]);
            cpu.compute();
            let result = wordToDec(cpu.accumulator);
            assert.equal(result, parseInt(test_data[i].result), 
                "Failed at " + test_data[i].value1 + " " + 
                test_data[i].operation + " " + test_data[i].value2);
          }
        });
      });

  } catch (error) {
    console.error('Error reading CSV file:', error);
  }
};

// Converts a string of 1s, 0s, and -1s to an array of tris
const strToWord = (str) => {
    let word = [];
    let input = [];
    let neg = false;
    let j = 0;
    for (let i = 0; i < str.length; i++) {
        if (neg) {
            input[j] = -1;
            j++;
            neg = false;
        } else if (str[i] == "0") {
            input[j] = 0;
            j++;
        } else if (str[i] == "1") {
            input[j] = 1;
            j++;
        } else {
            neg = true;
        }
    }
    for (let i = 0; i < WORD_SIZE; i++) {
        word[i] = new Tri();
        word[i].setState(input[i]);
    }
    return word;
}

// Read the test data from the csv file and run the tests for shift/rot
const runShiftRot = async () => {
    const test_data = [];

  try {
    const stream = fs.createReadStream(ShiftRotPath).pipe(csvParser());

    for await (const row of stream) {
      test_data.push(row);
    }

    describe("Shift/Rot Tests", function () {
        it("tests shift/rot correctness for ALU", function () {
          for (let i = 0; i < test_data.length; i++) {
            cpu.alu.inputs[0].writeBus(strToWord(test_data[i].input));
            cpu.alu.writeInstruction(sigMap[test_data[i].operation]);
            cpu.compute();
            let result = new Word();
            result.writeWord(strToWord(test_data[i].result));
            assert.equal(wordToDec(result), wordToDec(cpu.accumulator), 
            "Failed at " + test_data[i].input + " " + test_data[i].operation);
          }
        });
      });

  } catch (error) {
    console.error('Error reading CSV file:', error);
  }
};

// Run all the tests
runAddSub();
runShiftRot();
