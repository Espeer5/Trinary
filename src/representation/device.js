// This file will contain a standard interface for a logic device installed 
// into the machine. An example of a device is an adder/subtractor, or something 
// as large as the entire CPU

import { IOBus } from "./IOBus.js"

// This is the base class for all devices
export class AbsractDevice {
    // All devices must have a list of inputs and an output IOBus. Each entry 
    // in the inputs array is an IOBus.
    inputs = [];
    output = new IOBus();

    addInput(bus) {
        // Adds an input to the device. The input must be an IOBus
        if(bus instanceof IOBus) {;
            this.inputs.push(bus);
        } else {
            throw new Error("Input must be an IOBus");
        }
    }

    compute() {
        // This function is called to compute the output of the device
        throw new Error("Not implemented for abstract device");
    }
}