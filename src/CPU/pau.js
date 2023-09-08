/**
 * This file contains the PAU of the CPU. The PAU is responsible for computing
 * the program address of the next instruction to be executed and writing it to
 * program counter register (R03). The inputs to the PAU should be
 * the output of a mux controlled by the CPU control unit that select whether
 * the PAU should address relatively or absolutely.
 */

import { AbstractDevice } from "../representation/device";
import { WordAdder } from "./cpu_devices";

export class PAU extends AbstractDevice {
  /**
   * Create the PAU and wire up the input and output lines.
   *
   * @param {IOBus} input - the input line (output of dir/abs mux)
   * @param {IOBus} offset - the offset line (PC offset from instruction)
   */
  constructor(input, offset) {
    super();
    this.addInput(input);
    this.addInput(offset);
    this.adder = new WordAdder(this.inputs[0], new IOBus(), this.output);
  }
}
