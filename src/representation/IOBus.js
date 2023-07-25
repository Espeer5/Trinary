// An IObus is a word-sized bus which may pass Tris from one device (the output)
// device) to another (input device). This is a standard interface for passing 
// data between system components.

import { WORD_SIZE } from "./constants.js";
import { Tri } from "./tri.js";

export class IOBus {
    constructor() {
        this.data = [];
        for(let i = 0; i < WORD_SIZE; i++) {
            this.data[i] = new Tri();
        }
    }

    // Set the Tri in the bus at index i to value v
    setTri(i, v) {
        this.data[i].setState(v);
    }

    // Write the entire bus to the output of another bus
    writeBus(v) {
        for (let i = 0; i < WORD_SIZE; i++) {
            this.setTri(i, v[i].state);
        }
    }

    // Return the state of the ith tri in the bus
    readTri(i) {
        return this.data[i].state
    }

    // return the full array of Tris in the bus
    readBus() {
        return this.data
    }
}