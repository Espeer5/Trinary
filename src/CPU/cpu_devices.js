// Some utility devices used throughout the CPU. Each device is a subclass of
// AbsractDevice, which is defined in src/representation/device.js.

import { WORD_SIZE } from "../representation/constants.js"
import { IOBus } from "../representation/IOBus.js"
import * as gates from "../TriArithmetic/gates.js"
import { AbsractDevice } from "../representation/device.js"
import { Adder } from "./adder.js"
import { Tri } from "../representation/tri.js"

// Takes in two arrays of Tri objects and a carry in VALUE and computes the 
// result and carry out value. 
export class WordAdder extends AbsractDevice {
    //A full adder device for 2 input IO busses with carry in and carry out
    //Create an array of tri adders
    triAdders = [];
    constructor(busIn1, busIn2, cIn) {
        //extend AbstractDevice functionality
        super();
        // Wire up the 2 input busses as device inputs and the carry in
        this.addInput(busIn1);
        this.addInput(busIn2);
        this.cIn = cIn;
        // Wire the internal tri adders with carry propogation
        for (let i = 0; i < WORD_SIZE; i++) {
            let carryProp = this.cIn;
            if (i != 0) {
                carryProp = this.triAdders[i - 1].cOut;
            }
            this.triAdders[i] = new Adder(
                this.inputs[0].data[i], 
                this.inputs[1].data[i],
                carryProp,
                this.output.data[i],
                new Tri()
            );
        }
        // Each cOut should be stored in the next adders cIn
        this.cOut = this.triAdders[WORD_SIZE - 1].cOut;
    }
    
    compute() {
        // Compute the output of each tri adder as wired in the constructor
        for (let i = 0; i < WORD_SIZE; i++) {
            this.triAdders[i].compute();
        }
    }
}

export class AddSub extends AbsractDevice{
    constructor(control, wordIn1, wordIn2, cIn) {
        super();
        // Wire up the carry in, inputs, and internal bus adder
        this.cIn = cIn;
        this.inputs = [wordIn1, wordIn2];
        this.adder = new WordAdder(this.inputs[0], this.inputs[1], this.cIn);
        // Has one control signal to select operation
        this.control = control;
        this.adder.val1 = this.inputs[0];
        // Create a bus for the second input to the adder which will be 
        // written by the value of a multiply gate
        this.adder.val2 = new IOBus();
        this.adder.cIn = this.cIn;
        //Overwrite the output with the adder's output
        this.output = this.adder.output;
        this.carry = this.adder.cOut;
    }
    
    compute() {
        //Extend the control to a WORD_SIZE bus
        let temp = new IOBus();
        gates.wordMap((x)=>this.control.state, temp.data)
        //Supply the second input selected by the control signal to the adder
        this.adder.val2.writeBus(gates.wordMap2(gates.MUL, temp.data, this.inputs[1].data));
        this.adder.compute();
    }
}

//Muxes

export class ThreeOne {
    out1;
    out2;
    out3;
    out;
    sig;

    select() {
        if (this.sig.state == -1) {
            this.out = this.out1;
        } else if (this.sig.state == 0) {
            this.out = this.out2;
        } else {
            this.out = this.out3;
        }
    }
}

export class NineTwo {
    keyMap = new Map();
    outs;
    sigs;
    out;
    constructor() {
        this.keyMap.set("-1,-1", 0);
        this.keyMap.set("-1,0", 1);
        this.keyMap.set("-1,1", 2);
        this.keyMap.set("0,-1", 3);
        this.keyMap.set("0,0", 4);
        this.keyMap.set("0,1", 5);
        this.keyMap.set("1,-1", 6);
        this.keyMap.set("1,0", 7);
        this.keyMap.set("1,1", 8);
    }

    select() {
        let sigCode = this.sigs[0].state.toString()+ "," + this.sigs[1].state.toString();
        this.out = this.outs[this.keyMap.get(sigCode)];
    }
}
