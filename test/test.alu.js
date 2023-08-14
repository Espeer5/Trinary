import { CPU } from "../src/CPU/cpu.js";
import { Tri } from "../src/representation/tri.js";
import { wordToDec, decimalToBalancedTernary } from "../src/TriArithmetic/conversions.js";
import assert from "assert";
import { WORD_SIZE } from "../src/constants.js";
import fs from "fs";
import csvParser from 'csv-parser';

const filePath = 'test/add_sub_test.csv';

const create_sig = (sig) => {
    let sig_arr = [];
    for (let i = 0; i < 6; i++) {
        sig_arr[i] = new Tri();
        sig_arr[i].setState(sig[i]);
    }
    return sig_arr;
}

const create_bus = (bus) => {
    let bus_arr = [];
    for (let i = 0; i < WORD_SIZE; i++) {
        bus_arr[i] = new Tri();
        bus_arr[i].setState(bus[i]);
    }
    return bus_arr;
}

const cpu = new CPU();

const sigMap = {
    "+" : create_sig([1, -1, -1, 0, -1, -1]),
    "-" : create_sig([-1, -1, -1, 0, -1, -1]),
    "<<": create_sig([0, -1, -1, 1, -1, 1]),
    ">>": create_sig([0, -1, -1, 1, 0, -1]),
    ">>>": create_sig([0, -1, -1, 1, -1, 0]),
    "<<<": create_sig([0, -1, -1, 1, -1, -1]),
}

const runAddSub = async () => {
  const test_data = [];

  try {
    const stream = fs.createReadStream(filePath).pipe(csvParser());

    for await (const row of stream) {
      test_data.push(row);
    }

    describe("Add/Sub Tests", function () {
        it("tests add/sub correctness for ALU", function () {
          for (let i = 0; i < test_data.length; i++) {
            cpu.alu.inputs[0].writeBus(decimalToBalancedTernary(parseInt(test_data[i].value1)));
            cpu.alu.inputs[1].writeBus(decimalToBalancedTernary(parseInt(test_data[i].value2)));
            cpu.alu.writeInstruction(sigMap[test_data[i].operation]);
            cpu.compute();
            let result = wordToDec(cpu.accumulator);
            assert.equal(result, parseInt(test_data[i].result), "Failed at " + test_data[i].value1 + " " + test_data[i].operation + " " + test_data[i].value2);
          }
        });
      });

  } catch (error) {
    console.error('Error reading CSV file:', error);
  }
};

runAddSub();
