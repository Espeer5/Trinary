// This file defines the different gates used in the ternary processor as 
// functions. These gates take in and return state values

import { IOBus } from "../representation/IOBus.js"
import { WORD_SIZE } from "../representation/constants.js"

// Single input gates first

//Buffer
export function BUF(val) {
    return val
}

//Inverter
export function INV(val) {
    return -1 * val
}

//Positive bias inverter
export function PINV(val) {
    if (val == 0) {
        return 1
    } else {
        return -1 * val
    }
}

//Negative bias inverter
export function NINV(val) {
    if (val == 0) {
        return -1
    } else {
        return -1 * val
    }
}

// Two input gates

//Minimum
export function MIN(val1, val2) {
    return Math.min(val1, val2)
}

//Maximum
export function MAX(val1, val2) {
    return Math.max(val1, val2)
}

//Inverse minimum
export function nMIN(val1, val2) {
    return INV(MIN(val1, val2))
}

//Inverse maximum
export function NMAX(val1, val2) {
    return INV(MAX(val1, val2))
}

//Consensus
export function CONS(val1, val2) {
    if (val1 == val2) {
        return val1
    } else {
        return 0
    }
}

//Inverse consensus
export function NCONS(val1, val2) {
    return INV(CONS(val1, val2))
}

//Any
export function ANY(val1, val2) {
    if (val1 == val2) {
        return val1
    } else if (val1 == 0) {
        return val2
    } else if (val2 == 0) {
        return val1
    } else {
        return 0
    }
}

//Inverse any
export function NANY(val1, val2) {
    return INV(ANY(val1, val2))
}

//Multiply
export function MUL(val1, val2) {
    return val1 * val2
}

//Inverse multiply
export function NMUL(val1, val2) {
    return INV(MUL(val1, val2))
}

//Add
export function ADD(val1, val2) {
    if (val1 == -1 && val2 == -1) {
        return 1
    } else if(val1 == 1 && val2 == 1) {
        return -1
    } else {
        return val1 + val2
    }
}

//Inverse add
export function NADD(val1, val2) {
    return INV(ADD(val1, val2))
}

//Bus-wise gate application

//Runs every line in a bus through the same type of gate
export function wordMap(funct, val) {
    let result = new IOBus;
    for (let i = 0; i < WORD_SIZE; i++) {
       result.setTri(i, funct(val[i].state));
    }
    return result.readBus()
}

//Runs each tri from the same lines of 2 different busses through the same 
// 2 input gate
export function wordMap2(funct, val1, val2) {
    let result = new IOBus();
    for (let i = 0; i < WORD_SIZE; i++) {
        result.setTri(i, funct(val1[i].state, val2[i].state));
    }
    return result.readBus()
}
