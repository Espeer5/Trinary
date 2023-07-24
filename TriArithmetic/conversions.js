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

export function decToTri(input) {
    let i = -1;
    let result = [];
    while (input != 0) {
        i += 1;
        let rem = input % 3;
        result[i] = rem;
        input = Math.floor(input / 3);
    }
    return result;
}