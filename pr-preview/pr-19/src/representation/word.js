/** This module defines a word for this trinary computing system. */

import { Tri } from "./tri.js";
import { WORD_SIZE } from "../constants.js";

/**
 * Class representing a word as an array of Tris. Each word is of size WORD_SIZE
 * defined in constants.js. Words are intended as the basic unit of data storage
 * and are stored in one place. They are not intended to be used as registers
 * or for computation, use IOBusses for that. As a result the data is a
 * protected field and can only be accessed through the readWord() and
 * writeWord() methods.
 *
 * @property {Tri[]} data - the private array of Tris that make up the word
 */
export class Word {
  #data = [];

  constructor() {
    for (let i = 0; i < WORD_SIZE; i++) {
      this.#data[i] = new Tri();
    }
  }

  /**
   * Return the data array stored in the word to read their states
   *
   * @returns {Tri[]} - the array of Tris stored in the word
   */
  readWord() {
    return this.#data;
  }

  /**
   * Write an array of Tris to the word. The array must be of size WORD_SIZE
   *
   * @param {Tri[]} data - the array of Tris to write to the word
   * @throws {Error} - if the array is not of size WORD_SIZE
   */
  writeWord(data) {
    if (data.length == WORD_SIZE && data[0] instanceof Tri) {
      this.#data = data;
    } else {
      console.error("Attempting to write invalid value to word");
    }
  }

  /**
   * Return a string representation of the word. The string is the
   * concatenation of the states of the Tris in the word
   *
   * @returns {string} - a string representation of the word
   */
  toString() {
    let rep = "";
    for (let i = WORD_SIZE - 1; i >= 0; i--) {
      rep += this.#data[i].state;
    }
    return rep;
  }
}
