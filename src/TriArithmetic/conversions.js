/**
 * Utility functions for converting back and forth between tri and other 
 * representations
*/

import { WORD_SIZE } from "../constants.js";
import { Word } from "../representation/word.js";
import { Tri } from "../representation/tri.js";

/**
 * Covert a word to a decimal number. The word must be of size WORD_SIZE.
 * 
 * @param {Word} word 
 * @returns {number} - the decimal value of the word
 */
export function wordToDec(word) {
    let dec = 0;
    let wordVals = word.readWord();
    for (let i = 0; i < WORD_SIZE; i++) {
        dec += wordVals[i].state * (3 ** i); 
    }
    return dec;
}
