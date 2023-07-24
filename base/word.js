// This module defines a word for this trinary computing system.

import {Tri} from './tri.js';
import {WORD_SIZE} from "./constants.js"

export class Word {
    #data = new Array(WORD_SIZE).fill(new Tri());;

    // read the values of the Tris stored in a word
    readWord() {
        return this.#data;
    }

    // Write a value to a word
    writeWord(data) {
        if (data.length == WORD_SIZE && data[0] instanceof Tri) {
            this.#data = data;
        } else {
            console.error("Attempting to write invalid value to word");
        }
    }

    //String representation of a word
    toString() {
        let rep = "";
        for(let i = 0; i < WORD_SIZE; i++) {
            rep += this.#data[i].state;
        }
        return rep
    }
}