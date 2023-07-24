// Utility functions for converting back and forth between tri and other 
// representations

import { WORD_SIZE } from "../representation/constants.js";
import { Tri } from "../representation/tri.js";

export function wordToDec(word) {
    let dec = 0;
    let wordVals = word.readWord();
    for (let i = 0; i < WORD_SIZE; i++) {
        dec += wordVals[i].state * (3 ** i); 
    }
    return dec;
}
