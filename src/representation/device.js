/**
 * This file contains a standard interface for a logic device installed
 * into the machine. An example of a device is an adder/subtractor, or something
 * as large as the entire CPU
 */

import { IOBus } from "./IOBus.js";

/**
 * Abstract class representing a logic device. All devices must inherit from
 * this class and implement the compute() function. Every device must have a
 * list of inputs and an output IOBus. Each entry in the inputs array is an
 * IOBus.
 *
 * @property {IOBus[]} inputs - the list of IOBusses that are inputs to the device
 * @property {IOBus} output - the IOBus that is the output of the device
 */
export class AbsractDevice {
  inputs = [];
  output = new IOBus();

  addInput(bus) {
    /**
     * Add an input to the device. The input must be an IOBus
     *
     * @param {IOBus} bus - the IOBus to add to the device
     */
    if (bus instanceof IOBus) {
      this.inputs.push(bus);
    } else {
      throw new Error("Input must be an IOBus");
    }
  }

  compute() {
    /**
     * Compute the output of the device based on the input. This function
     * must be implemented by each device
     *
     * @abstract
     */
    throw new Error("Not implemented for abstract device");
  }
}
