/// This file defines the basic computing unit for this computing system, a tri.
// This is the trinary equivalent to a binary bit. Basic functions on Tri's are 
// also defined here

const STATES = new Set([-1, 0, 1]);

// Tri object: Default state is off
export class Tri {
    state = 0;

    // Set a Tri to one of the three valid states
    setState(state) {
        if (STATES.has(state)) {
            this.state = state;
        } else {
            console.error("Tri set to invalid state. Reload");
        }
    }
}
