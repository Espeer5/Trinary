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
    dec += wordVals[i].state * 3 ** i;
  }
  return dec;
}

/**
 * Converts a decimal value to a string of unbalanced ternary digits (0, 1, 2)
 *
 * @param {number} decimal
 * @returns {string} - unbalanced ternary string
 */
function decimalToUnbalancedTernary(decimal) {
  if (decimal == 0) {
    return "";
  }

  let remainder = decimal % 3;
  decimal = Math.floor(decimal / 3);
  let str = "";
  if (remainder < 0) {
    decimal += 1;
    str = parseInt(remainder + 3 * -1);
  } else {
    str = parseInt(remainder);
  }
  str += decimalToUnbalancedTernary(decimal, str);

  return str;
}

/**
 * Converts a dec to balanced ternary representation
 * @param {decimal} decimal
 * @returns {balancedTernary} - ternary value
 */
export function decimalToBalancedTernary(decimal) {
  // Handle negative inputs
  let neg = false;
  if (decimal < 0) {
    neg = true;
    decimal = decimal * -1;
  }

  // Check if the decimal number is within the bounds based on WORD_SIZE
  let maxDecimal = 0;
  let minDecimal = 0;
  for (let i = 0; i < WORD_SIZE; i++) {
    maxDecimal += 3 ** i;
    minDecimal -= 3 ** i;
  }

  if (decimal > maxDecimal || decimal < minDecimal) {
    throw new Error("Decimal number is out of bounds for the given WORD_SIZE.");
  }

  // First convert decimal to standard ternary
  let unb = "";
  unb = decimalToUnbalancedTernary(decimal, unb);
  // Now, convert unb ternary to balanced ternary
  let bT = [];

  for (let i = 0; i < WORD_SIZE; i++) {
    bT[i] = new Tri();
    if (i < unb.length) {
      bT[i].state = parseInt(unb[i]);
    }
  }

  let mem = 0;
  for (let i = 0; i < unb.length; i++) {
    bT[i].state = bT[i].state + mem;
    mem = 0;
    if (bT[i].state == 2) {
      bT[i].state = -1;
      mem = 1;
    }
    if (bT[i].state == 3) {
      bT[i].state = 0;
      mem = 1;
    }
    if (i == unb.length - 1 && i < WORD_SIZE - 1) {
      bT[i + 1].state = bT[i + 1].state + mem;
    }
  }

  if (neg) {
    for (let i = 0; i < WORD_SIZE; i++) {
      bT[i].state = bT[i].state * -1;
    }
  }
  return bT;
}
