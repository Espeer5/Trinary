/** 
 * An IObus is a word-sized bus which may pass Tris from one device (the output)
 * device) to another (input device). This is a standard interface for passing 
 * data between system components.
 */

import { WORD_SIZE } from "./constants.js";
import { Tri } from "./tri.js";

/**
 * Class representing an IOBus. An IOBus is a word-sized bus which may pass Tris
 * from one device (the output device) to another (input device). This is a
 * standard interface for passing data between system components.
 * 
 * @property {Tri[]} data - the array of Tris that make up the IOBus
 */
export class IOBus {
    constructor() {
        this.data = [];
        for(let i = 0; i < WORD_SIZE; i++) {
            this.data[i] = new Tri();
        }
    }

    /**
     * Set the state of the ith tri in the bus to the state v, which must be a
     * valid state for a Tri.
     * 
     * @param {number} i - the index of the Tri to set
     * @param {number} v - the state to set the Tri to
     * @throws {Error} - if v is not a valid state for a Tri
     */
    setTri(i, v) {
        this.data[i].setState(v);
    }

    /** 
     * Write the entire bus to the given array of Tris. The array must be of
     * size WORD_SIZE.
     * 
     * @param {Tri[]} v - the array of Tris to write to the bus
     */
    writeBus(v) {
        for (let i = 0; i < WORD_SIZE; i++) {
            this.setTri(i, v[i].state);
        }
    }

    /**
     * Reads the state of the ith Tri in the bus
     * 
     * @param {number} i 
     * @returns {number} - the state of the ith Tri in the bus
     */
    readTri(i) {
        return this.data[i].state
    }

    /**
     * Reads the entire bus
     * 
     * @returns {Tri[]} - the array of Tris stored in the bus
     */
    readBus() {
        return this.data
    }
}