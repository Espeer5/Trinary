/** Utility functions for shifting or rotating a word on this system */

import { IOBus } from "../representation/IOBus.js";
import { WORD_SIZE } from "../constants.js";

/**
 * Takes in an array of Tris, left moves the array in place
 *
 * @param {Tri[]} val - the array of tris to move
 * @param {number} filler - the value to fill the empty space with
 * @returns {Tri[]} - the shifted array
 */
function LMove(val, filler) {
  let result = new IOBus();
  for (let i = WORD_SIZE - 1; i > 0; i--) {
    result.setTri(i, val[i - 1].state);
  }
  result.setTri(0, filler);
  return result.readBus();
}

/**
 * Takes in an array of Tris, right moves the array in place
 *
 * @param {Tri[]} val - the array of tris to move
 * @param {number} filler - the value to fill the empty space with
 * @returns {Tri[]} - the shifted array
 */
function RMove(val, filler) {
  let result = new IOBus();
  for (let i = 0; i < WORD_SIZE - 1; i++) {
    result.setTri(i, val[i + 1].state);
  }
  result.setTri(WORD_SIZE - 1, filler);
  return result.readBus();
}

/**
 * Left shifts the word
 *
 * @param {Tri[]} val - the array of tris to shift
 * @returns {Tri[]} - the shifted array
 */
export function LShift(val) {
  return LMove(val, 0);
}

/**
 * right shifts the word
 *
 * @param {Tri[]} val - the array of tris to shift
 * @returns {Tri[]} - the shifted array
 */
export function RShift(val) {
  return RMove(val, 0);
}

/**
 * Rotate the word left
 *
 * @param {Tri[]} val - the array of tris to rotate
 * @returns {Tri[]} - the rotated array
 */
export function LRot(val) {
  let filler = val[WORD_SIZE - 1];
  return LMove(val, filler.state);
}

/**
 * Rotate the word right
 *
 * @param {Tri[]} val - the array of tris to rotate
 * @returns {Tri[]} - the rotated array
 */
export function RRot(val) {
  let filler = val[0];
  return RMove(val, filler.state);
}
