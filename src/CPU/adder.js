// Defines an adder as well as the type returned by an adder circuit. Adders 
// return an object containing both the sum and carry values out of the adder.

import * as gates from "../TriArithmetic/gates.js"
import {WORD_SIZE} from "../representation/constants.js"
import { Tri } from "../representation/tri.js"
import { IOBus } from "../representation/IOBus.js";

export class HalfAdder {
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
    //Has 2 internal half adders, one adds the input lines, one adds Cin
    constructor(line1, line2, cIn, result, cOut) {
        let inter_r = new Tri();
        this.inter_c_1 = new Tri();
        this.inter_c_2 = new Tri();
        this.hAdd_lines = new HalfAdder(line1, line2, inter_r, inter_c_1);
        this.hAdd_cIn = new HalfAdder(cIn, inter_r, result, inter_c_2);
        this.result = result;
        this.cOut = cOut;
    }

    compute() {
        // Compute the sum and carry of the input lines
        this.hAdd_lines.compute();

        // Now compute the sum and carry of the result with the carry in
        this.hAdd_cIn.compute();
        
        // Set the carry out
        this.COut.setState(gates.ANY(this.inter_c_1, this.inter_c_2));
    } 
}

// Takes in two arrays of Tri objects and a carry in VALUE and computes the result
export class WordAdder {
    busOut = new IOBus();
    busIn1;
    busIn2;
    cIn;
    constructor() {
        for (let i = 0; i < WORD_SIZE; i++) {
            let carryProp = this.cIn;
            if (i != 0) {
                carryProp = this.triAdders[i - 1].cOut;
            }
            this.triAdders[i] = new Adder(
                this.busIn1.data[i], 
                this.busIn2.data[i],
                carryProp,
                busOut.data[i],
                new Tri()
            );
        }
        this.result = result;
        this.cOut = this.triAdders[WORD_SIZE - 1].COut;
    }
    
    compute() {
        for (let i = 0; i < WORD_SIZE; i++) {
            this.triAdders[i].compute();
        }
    }
}