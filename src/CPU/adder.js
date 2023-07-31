// Defines an adder as well as the type returned by an adder circuit. Adders 
// return an object containing both the sum and carry values out of the adder.

import * as gates from "../TriArithmetic/gates.js"
import {WORD_SIZE} from "../representation/constants.js"
import { Tri } from "../representation/tri.js"
import { IOBus } from "../representation/IOBus.js";
import { AbsractDevice } from "../representation/device.js";

export class HalfAdder {
    //An adder for 2 tri objects with carry out
    //Needs 2 input lines, a result and carry out. Should come from an IO bus
    constructor(line1, line2, result, carry) {
        this.line1 = line1;
        this.line2 = line2;
        this.result = result;
        this.carry = carry;
    }

    compute() {
        this.result.setState(gates.ADD(this.line1.state, this.line2.state));
        this.carry.setState(gates.CONS(this.line1.state, this.line2.state));
    }
}

export class Adder {
    //A full adder for 2 tri objects with carry in and carry out
    //Has 2 internal half adders, one adds the input lines, one adds Cin
    constructor(line1, line2, cIn, result, cOut) {
        //Intermediate sum term
        let inter_r = new Tri();
        //intermediate carry terms
        this.inter_c_1 = new Tri();
        this.inter_c_2 = new Tri();
        //Create the 2 internal half adders for the 2 inputs and the carry in
        this.hAdd_lines = new HalfAdder(line1, line2, inter_r, this.inter_c_1);
        this.hAdd_cIn = new HalfAdder(cIn, inter_r, result, this.inter_c_2);
        // Set the output lines. Result come from the second half adder, carry
        // out has a specified destination
        this.result = result;
        this.cOut = cOut;
    }

    compute() {
        // Compute the sum and carry of the input lines
        this.hAdd_lines.compute();

        // Now compute the sum and carry of the result with the carry in
        this.hAdd_cIn.compute();

        // Set the carry out, the ANY of the two intermediate carry terms
        this.cOut.setState(gates.ANY(this.inter_c_1, this.inter_c_2));
    } 
}

// Takes in two arrays of Tri objects and a carry in VALUE and computes the 
// result
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