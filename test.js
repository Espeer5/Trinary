import { CPU } from "./CPU/cpu.js";
import { wordToDec } from "./TriArithmetic/conversions.js";

console.log("running");
let cpu = new CPU();

cpu.alu.DBIn2[0].setState(1);
cpu.alu.signal_lines[0].setState(-1);
cpu.alu.signal_lines[1].setState(0);
cpu.alu.signal_lines[2].setState(0);
cpu.alu.signal_lines[3].setState(-1);
cpu.compute();
console.log(cpu.accumulator.toString());
console.log(wordToDec(cpu.accumulator));
console.log(cpu.alu.addsub.carry);