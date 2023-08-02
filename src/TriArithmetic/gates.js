/** 
 * This file defines the different gates used in the ternary processor as 
 * functions. These gates take in and return state values
 */

import { IOBus } from "../representation/IOBus.js"
import { WORD_SIZE } from "../representation/constants.js"

// Single input gates first

/**
 * Buffer Gate
 * 
 * @param {number} val - the value to pass through the gate
 * @returns {number} - BUF(val)
 */
export function BUF(val) {
    return val
}

/**
 * Inverter Gate
 * 
 * @param {number} val - the value to pass through the gate
 * @returns {number} - INV(val)
 */
export function INV(val) {
    return -1 * val
}

/**
 * Positive Bias Inverter Gate
 * 
 * @param {number} val - the value to pass through the gate
 * @returns {number} - PINV(val)
 */
export function PINV(val) {
    if (val == 0) {
        return 1
    } else {
        return -1 * val
    }
}

/**
 * Negative Bias Inverter Gate
 * 
 * @param {number} val - the value to pass through the gate
 * @returns {number} - NINV(val)
 */
export function NINV(val) {
    if (val == 0) {
        return -1
    } else {
        return -1 * val
    }
}

// Two input gates

/**
 * Minimum Gate
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @returns {number} - MIN(val1, val2)
 */
export function MIN(val1, val2) {
    return Math.min(val1, val2)
}

/**
 * Maximum Gate
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @returns {number} - MAX(val1, val2)
 */
export function MAX(val1, val2) {
    return Math.max(val1, val2)
}

/**
 * Inverse Minimum Gate
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @returns {number} - INV(MIN(val1, val2))
 */
export function nMIN(val1, val2) {
    return INV(MIN(val1, val2))
}

/**
 * Inverse Maximum Gate
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @returns {number} - INV(MAX(val1, val2))
 */
export function NMAX(val1, val2) {
    return INV(MAX(val1, val2))
}

/**
 * Consensus Gate
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @returns {number} - CONS(val1, val2)
 */
export function CONS(val1, val2) {
    if (val1 == val2) {
        return val1
    } else {
        return 0
    }
}

/**
 * Inverse Consensus Gate
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @returns {number} - INV(CONS(val1, val2))
 */
export function NCONS(val1, val2) {
    return INV(CONS(val1, val2))
}

/**
 * Any Gate
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @returns {number} - ANY(val1, val2)
 */
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

/**
 * Inverse Any Gate
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @returns {number} - INV(ANY(val1, val2))
 */
export function NANY(val1, val2) {
    return INV(ANY(val1, val2))
}

/**
 * Multiply Gate
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @returns {number} - MUL(val1, val2)
 */
export function MUL(val1, val2) {
    return val1 * val2
}

/**
 * Inverse Multiply Gate
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @returns {number} - INV(MUL(val1, val2))
 */
export function NMUL(val1, val2) {
    return INV(MUL(val1, val2))
}

/**
 * Sum Gate
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @returns {number} - SUM(val1, val2)
 */
export function ADD(val1, val2) {
    if (val1 == -1 && val2 == -1) {
        return 1
    } else if(val1 == 1 && val2 == 1) {
        return -1
    } else {
        return val1 + val2
    }
}

/**
 * Inverse Sum Gate
 * 
 * @param {number} val1 
 * @param {number} val2 
 * @returns {number} - INV(SUM(val1, val2))
 */
export function NADD(val1, val2) {
    return INV(ADD(val1, val2))
}

//Bus-wise gate application

/**
 * Applies a function to each tri in a bus
 * 
 * @param {Function} funct - The function to apply to each tri
 * @param {Tri[]} val - The array of tris to apply the function to
 * @returns {Tri[]} - The array of tris with the function applied
 */
export function wordMap(funct, val) {
    let result = new IOBus;
    for (let i = 0; i < WORD_SIZE; i++) {
       result.setTri(i, funct(val[i].state));
    }
    return result.readBus()
}

/**
 * Applies a function to each pair of tris at the same indices in two busses
 * 
 * @param {Function} funct - The function to apply to each tri
 * @param {Tri[]} val1 - The first array of tris to apply the function to
 * @param {Tri[]} val2 - The second array of tris to apply the function to
 * @returns {Tri[]} - The array of tris resulting from the function
 */
export function wordMap2(funct, val1, val2) {
    let result = new IOBus();
    for (let i = 0; i < WORD_SIZE; i++) {
        result.setTri(i, funct(val1[i].state, val2[i].state));
    }
    return result.readBus()
}
