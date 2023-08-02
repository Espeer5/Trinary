/** 
 * This module defines the system clock for the trinary computer. The clock is
 * cycle runs at a rate of CLOCK_RATE Hz, with each cycle beginning with a 
 * rising edge and ending on the next rising edge.
 */

import { CLOCK_RATE } from "./representation/constants.js";
import { Tri } from "./representation/tri.js";

/** 
 * The clock is an object whose state is a Tri, but with only two states, 1 and 
 * -1. The clock's state is updated by the tick() method, which is called at a 
 * regular interval by the system determined by the CLOCK_RATE constant. The 
 * clock is always initialized to -1.
 * 
 * @property {Tri} state - the state of the clock. Must be 1 or -1
 */
export class Clock {
    state = new Tri();

    constructor() {
        // The clock's state is initialized to -1
        this.state.setState(-1);
    }

    /** Flip the clock's state */
    tick() {
        this.state.state *= -1;
    }

    /** Start the cycling of the clock */
    start() {
        setInterval(this.tick.bind(this), (1 / CLOCK_RATE) * 1000);
    }

}