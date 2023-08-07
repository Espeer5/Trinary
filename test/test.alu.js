import { CPU } from "../src/CPU/cpu.js";
import { Tri } from "../src/representation/tri.js";
import { wordToDec, decimalToBalancedTernary } from "../src/TriArithmetic/conversions.js";
import assert from "assert";
import { WORD_SIZE } from "../src/constants.js";

console.log("running");
/* let cpu = new CPU();

for(let i = 0; i <= 5; i++) {
    console.log(decimalToBalancedTernary(i));
}

cpu.alu.inputs[0].setTri(0, 1);
cpu.alu.inputs[1].setTri(0, 1);
cpu.alu.signal_lines.setTri(0, 0);
cpu.alu.signal_lines.setTri(1, 0);
cpu.alu.signal_lines.setTri(2, 0);
cpu.alu.signal_lines.setTri(3, 1);
cpu.alu.signal_lines.setTri(4, -1);
cpu.alu.signal_lines.setTri(5, -1);
cpu.compute();
console.log(cpu.accumulator.toString());
cpu.alu.inputs[0].setTri(0, 0);
cpu.alu.inputs[1].setTri(0, 0);
cpu.alu.inputs[0].setTri(1, 1);
cpu.compute();
console.log(cpu.accumulator.toString()); */

let tri_zero = []
let tri_minus_one = []
let tri_one = []

for (let i = 0; i < WORD_SIZE; i++) {
    tri_zero[i] = new Tri();
    tri_minus_one[i] = new Tri();
    tri_one[i] = new Tri();
}

tri_minus_one[0].setState(-1)
tri_one[0].setState(1)

describe("decimalToBalancedTernary", function() {
    it("should convert decimal numbers to balanced ternary representation", function() {
        assert.equal(decimalToBalancedTernary(0), tri_zero);
        assert.equal(decimalToBalancedTernary(1), tri_one);
        assert.equal(decimalToBalancedTernary(-1), tri_minus_one);
    });
});
