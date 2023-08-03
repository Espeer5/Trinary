/**
 * This file defines the basic computing unit for this computing system, a tri.
 * This is the trinary equivalent to a binary bit. Basic functions on Tri's are
 * also defined here
 */

/** The valid states for a tri to take on */
const STATES = new Set([-1, 0, 1]);

/**
 * Class representing a single trit as an object with 3 possible states.
 * Default state is off
 *
 * @property {number} state - the state of the Tri. Must be -1, 0, or 1
 */
export class Tri {
  state = 0;

  /**
   *  Set a Tri to one of the three valid states
   *
   * @param {number} state - the state to set the Tri to. Must be -1, 0, or 1
   */
  setState(state) {
    if (STATES.has(state)) {
      this.state = state;
    } else {
      console.error("Tri set to invalid state. Reload");
    }
  }
}
