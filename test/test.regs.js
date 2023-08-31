import { CPU } from "../src/CPU/cpu.js"
import assert from "assert";
import { REGISTERS_COUNT, WORD_SIZE } from "../src/constants.js";
import { Tri } from "../src/representation/tri.js";

// Test the software pipes for the hardware registers of the CPU

// Instantiate the CPU
const cpu = new CPU();

// Test that errors are thrown if the user attempts to access the reserved
// registers
describe("Reserved Register Tests", function () {
    it("tests reserved register access", function () {
        assert.throws(() => cpu.registers.read_reg(0));
        assert.throws(() => cpu.registers.read_reg(1));
        assert.throws(() => cpu.registers.read_reg(2));
        assert.throws(() => cpu.registers.read_reg(3));
        assert.throws(() => cpu.registers.write_reg(null, 0));
        assert.throws(() => cpu.registers.write_reg(null, 1));
        assert.throws(() => cpu.registers.write_reg(null, 2));
        assert.throws(() => cpu.registers.write_reg(null, 3));
    });
});

// Test that the registers can be written to and read from
describe("Register Read/Write Tests", function () {
    it("tests register read/write", function () {
        for (let i = 4; i < REGISTERS_COUNT; i++) {
            let toWrite = [];
            for (let j = 0; j < WORD_SIZE; j++) {
                toWrite[j] = new Tri();
                toWrite[j].setState(1);
            }
            cpu.registers.write_reg(toWrite, i);
            let result = cpu.registers.read_reg(i);
            assert.equal(result[0].state, 1);
            assert.equal(result[1].state, 1);
            assert.equal(result[2].state, 1);
            assert.equal(result[3].state, 1);
            assert.equal(result[4].state, 1);
            assert.equal(result[5].state, 1);
        }
    });
});

// Test that errors are thrown if the user attempts to access registers out of 
// bounds
describe("Out of Bounds Register Tests", function () {
    it("tests out of bounds register access", function () {
        assert.throws(() => cpu.registers.read_reg(-1));
        assert.throws(() => cpu.registers.read_reg(REGISTERS_COUNT));
        assert.throws(() => cpu.registers.write_reg(null, -1));
        assert.throws(() => cpu.registers.write_reg(null, REGISTERS_COUNT));
    });
});
