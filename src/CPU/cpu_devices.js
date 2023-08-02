/** 
 * Some utility devices used throughout the CPU. Each device is a subclass of
 * AbsractDevice, which is defined in src/representation/device.js.
 * */

import { WORD_SIZE } from ".constants.js"
import { IOBus } from "../representation/IOBus.js"
import * as gates from "../TriArithmetic/gates.js"
import { AbsractDevice } from "../representation/device.js"
import { Adder } from "./adder.js"
import { Tri } from "../representation/tri.js"

/**
 * Takes in two arrays of Tri objects and a carry in VALUE and computes the 
 * result and carry out value. 
 * 
 * @property {Tri} cIn - the carry in VALUE
 * @property {Adder[]} TriAdders - the array of adders for each tri in a bus
 * @property {Tri} cOut - the carry out VALUE
 * @extends AbsractDevice
 */
export class WordAdder extends AbsractDevice {
    //A full adder device for 2 input IO busses with carry in and carry out
    //Create an array of tri adders
    triAdders = [];

    /**
     * Create a new WordAdder device with the specified input busses and carry
     * in locations.
     * 
     * @param {IOBus} busIn1 
     * @param {IOBus} busIn2 
     * @param {Tri} cIn 
     * @constructor
     */
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
    
    /**
     * Compute the result of the addition of the two input busses with carries
     */
    compute() {
        // Compute the output of each tri adder as wired in the constructor
        for (let i = 0; i < WORD_SIZE; i++) {
            this.triAdders[i].compute();
        }
    }
}

/**
 * Takes in two arrays of Tri objects and a carry in VALUE and computes the
 * result and carry out value of addition or substraction depending on the 
 * setting of the control signal.
 * 
 * @property {Tri} cIn - the carry in VALUE
 * @property {WordAdder} adder - the internal adder device
 * @property {Tri} control - the control signal for addition or subtraction
 * @property {Tri} carry - the carry out VALUE
 * @extends AbsractDevice
 */
export class AddSub extends AbsractDevice{

    /**
     * Create a new AddSub device with the specified input busses, carry in
     * 
     * @param {Tri} control 
     * @param {IOBus} wordIn1 
     * @param {IOBus} wordIn2 
     * @param {Tri} cIn 
     * @constructor
     */
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
    
    /**
     * Compute the result of the addition or subtraction of the two input busses
     * with carries
     */
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

/**
 * A Three to one mux device. Takes in three inputs and a control signal and
 * selects the output based on the control signal.
 * 
 * @property {*} out1 - the first input
 * @property {*} out2 - the second input
 * @property {*} out3 - the third input
 * @property {*} out - the output
 * @property {Tri} sig - the control signal
 */
export class ThreeOne {
    out1;
    out2;
    out3;
    out;
    sig;

    /**
     * Set the output signal of the mux based on the state of the control 
     * signal.
     */
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

/**
 * A Nine to one mux device. Takes in nine inputs and two control signals and
 * outputs the selected input based on the control signals.
 * 
 * @property {*} outs - the nine inputs
 * @property {*} out - the output
 * @property {Tri[]} sigs - the two control signals
 * @property {Map} keyMap - a map of the control signal states to the output
 */
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

    /**
     * Set the output signal of the mux based on the state of the control
     * signals.
     */
    select() {
        let sigCode = this.sigs[0].state.toString()+ "," + this.sigs[1].state.toString();
        this.out = this.outs[this.keyMap.get(sigCode)];
    }
}
