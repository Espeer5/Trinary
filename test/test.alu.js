import { CPU } from "../src/CPU/cpu.js";
import { Tri } from "../src/representation/tri.js";
import { wordToDec, decimalToBalancedTernary } from "../src/TriArithmetic/conversions.js";
import assert from "assert";
import { WORD_SIZE } from "../src/constants.js";

/* console.log("running");
let cpu = new CPU();

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
console.log(cpu.accumulator.toString());
 */