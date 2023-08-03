/**
 * Defines a half adder and adder for two trits at the individual trit level.
 * Multiple adders must be chained together to create a word adder which is
 * a device defined in cpu_devices.js
 */

import * as gates from "../TriArithmetic/gates.js";
import { Tri } from "../representation/tri.js";

/**
 * A half adder for two tri objects
 *
 * @property {Tri} line1 - the first input line
 * @property {Tri} line2 - the second input line
 * @property {Tri} result - the output line
 * @property {Tri} carry - the carry out line
 */
export class HalfAdder {
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

/**
 * A full adder for two tri objects. Takes the sum of the two input lines and
 * sums this result with the carry in line. The output line is set to the result
 * of this operation and the carry out line is set to ANY of the carry out of
 * the first and second additions which are the intermediate carry terms.
 *
 * @property {Tri} line1 - the first input line
 * @property {Tri} line2 - the second input line
 * @property {Tri} cIn - the carry in line
 * @property {Tri} result - the output line
 * @property {Tri} cOut - the carry out line
 * @property {HalfAdder} hAdd_lines - the half adder for the input lines
 * @property {HalfAdder} hAdd_cIn - the half adder for the result and carry in
 * @property {Tri} inter_c_1 - the intermediate carry term for the input lines
 * @property {Tri} inter_c_2 - the intermediate carry term for the result and carry in
 */
export class Adder {
  /**
   * Wire up a the full adder with the specified input and output locations
   *
   * @param {Tri} line1 - Tri to read first input from
   * @param {Tri} line2 - Tri to read second input from
   * @param {Tri} cIn - Tri to read carry in from
   * @param {Tri} result - Tri to output sum to
   * @param {Tri} cOut - Tri to output carry out to
   * @constructor
   */
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

  /**
   * Computes the sum and carry out of the two input lines and the carry in
   * line. The result is stored in the output line and the carry out is stored
   * in the specified carry out line.
   */
  compute() {
    // Compute the sum and carry of the input lines
    this.hAdd_lines.compute();

    // Now compute the sum and carry of the result with the carry in
    this.hAdd_cIn.compute();

    // Set the carry out, the ANY of the two intermediate carry terms
    this.cOut.setState(gates.ANY(this.inter_c_1, this.inter_c_2));
  }
}
