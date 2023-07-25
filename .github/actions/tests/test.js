import { CPU } from "../../../src/CPU/cpu.js";
import { wordToDec } from "../../../src/TriArithmetic/conversions.js";

console.log("running");
let cpu = new CPU();

cpu.alu.DBIn1.setTri(0, 1);
cpu.alu.DBIn2.setTri(0, 1);
cpu.alu.signal_lines.setTri(0, 0);
cpu.alu.signal_lines.setTri(1, 0);
cpu.alu.signal_lines.setTri(2, 0);
cpu.alu.signal_lines.setTri(3, 1);
cpu.alu.signal_lines.setTri(4, -1);
cpu.alu.signal_lines.setTri(5, -1);
cpu.compute();
console.log(cpu.accumulator.toString());
console.log(wordToDec(cpu.accumulator));
console.log(cpu.alu.addsub.carry);
cpu.alu.DBIn1.setTri(0, 0);
cpu.alu.DBIn1.setTri(1, 1);
cpu.compute();
console.log(wordToDec(cpu.accumulator));
