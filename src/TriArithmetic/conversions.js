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
 * Converts a dec to balanced ternary representation
 * @param {decimal} decimal
 * @returns {balancedTernary} - ternary value
 */
export function decimalToBalancedTernary(decimal) {
  function decimalToBalancedTernaryDigit(digit) {
    if (digit === 0) return 0;
    if (digit === 1) return 1;
    if (digit === 2) return -1;
  }

  // Check if the decimal number is within the bounds
  const maxDecimal = 3 ** (WORD_SIZE - 1) - 1;
  const minDecimal = -maxDecimal;

  if (decimal > maxDecimal || decimal < minDecimal) {
    throw new Error("Decimal number is out of bounds for the given WORD_SIZE.");
  }

  // Convert the decimal number to balanced ternary representation
  let balancedTernary = [];
  let num = decimal;

  while (balancedTernary.length < WORD_SIZE) {
    const remainder = num % 3;
    balancedTernary.unshift(decimalToBalancedTernaryDigit(remainder));
    num = (num - remainder) / 3;
  }

  return balancedTernary;
}
