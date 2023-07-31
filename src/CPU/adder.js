// Defines a half adder and adder for two trits at the individual trit level.
// Multiple adders must be chained together to create a word adder which is 
// a device defined in cpu_devices.js

import * as gates from "../TriArithmetic/gates.js"
import { Tri } from "../representation/tri.js"

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
