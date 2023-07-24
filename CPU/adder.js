// Defines an adder as well as the type returned by an adder circuit. Adders 
// return an object containing both the sum and carry values out of the adder.

import * as gates from "../base/gates.js"
import {WORD_SIZE} from "../base/constants.js"
import { Tri } from "../base/tri.js"

export class HalfAdder {
    //Needs 2 input lines
    line1 = new Tri();
    line2 = new Tri();
    result = new Tri();
    carry = new Tri();

    compute() {
        this.result.setState(gates.ADD(line1.state, line2.state));
        this.carry.setState(gates.CONS(line1.state, line2.state));
    }
}

export class Adder {
    //Needs 2 input lines and a carry in line
    line1 = new Tri();
    line2 = new Tri();
    cIn = new Tri();
    //Has 2 internal half adders, one adds the input lines, one adds Cin
    hAdd_lines = new HalfAdder();
    hAdd_cIn = new HalfAdder();
    result = this.hAdd_cIn.result;
    COut = new Tri();

    compute() {
        // Compute the sum and carry of the input lines
        this.hAdd_lines.line1 = this.line1;
        this.hAdd_lines.line2 = this.line2;
        this.hAdd_lines.compute();

        // Now compute the sum and carry of the result with the carry in
        this.hAdd_cIn.line1 = this.cIn;
        this.hAdd_cIn.line2 = hAdd_line_out.sum;
        this.hAdd_cIn.compute();
        
        // Set the carry out
        this.COut.setState(gates.ANY(this.hAdd_lines.carry.state, this.hAdd_cIn.carry.state));
    } 
}

// Takes in two arrays of Tri objects as a carry in VALUE and computes the result
export class WordAdder {
    triAdders = new Array(WORD_SIZE).fill(new Adder());
    val1;
    val2;
    cIn;
    constructor() {
        result = [];
        for (i = 0; i < WORD_SIZE; i++) {
            result[i] = this.triAdders[i].result;
        }
        this.result = result;
    }
    cOut = this.triAdders[WORD_SIZE - 1].COut;
    
    compute() {
        carryProp = cIn;
        for (i = 0; i < WORD_SIZE; i++) {
            triAdders[i].line1 = val1[i];
            triAdders[i].line2 = val2[i];
            triAdders[i].cIn = carryProp;
            triAdders[i].compute();
            carryProp = triResult.carry;
        }
    }
}