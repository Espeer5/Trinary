/**
 * This file instantiates the trinary CPU with all necessary hardware structures
 */

import { Word } from "../representation/word.js";
import { ALU } from "./alu.js";
import { IOBus } from "../representation/IOBus.js";
import { CPURegs } from "./registers.js";
import { AbsractDevice } from "../representation/device.js";

/**
 * The CPU of the trinary computer. This class contains the accumulator, flags
 * register, and component modules of the CPU, which include the ALU, control
 * unit, PAU, and DAU. TODO: Add modules and complete docs
 */
export class CPU {
  /**
   * Create the CPU and its components. The CPU is composed of hardware
   * registers, ALU, control unit, PAU, and DAU.
   */
  constructor() {
    // Create the registers and assign reserved registers
    this.registers = new CPURegs();
    this.accumulator = this.registers.registers[0];
    this.SR = this.registers.registers[1];
    this.SP = this.registers.registers[3];

    // Create ALU input and control lines
    let aluIn1 = new IOBus();
    let aluIn2 = new IOBus();
    let aluControl = new IOBus();

    // Create and wire up the ALU
    this.alu = new ALU(aluIn1, aluIn2, aluControl);
  }

  /**
   * Computes the output of the CPU based on the control signals generated by
   * control unit for the incoming signal. Depending on the instruction this may
   * involve reading from or writing to memory, reading from or writing to the
   * registers, or performing an ALU operation. The result of ALU operations may
   * change the status register or accumulator or both.
   */
  compute() {
    this.alu.compute();
    this.accumulator.writeWord(this.alu.output.readBus());
  }
}
