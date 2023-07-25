// Utility functions for shifting or rotating a word on this system

import { IOBus } from "../representation/IOBus.js";
import { WORD_SIZE } from "../representation/constants.js"
import { Tri } from "../representation/tri.js";

//Takes in an array of Tris, left moves the array in place
function LMove(val, filler) {
    let result = new IOBus();
    for (let i = WORD_SIZE - 1; i > 0; i--) {
        result.setTri(i, val[i - 1].state);
    }
    result[0].setTri(filler);
    return result.readBus();
}

//Takes in an array of Tris, left moves the array and returns it
function RMove(val, filler) {
    let result = new IOBus();
    for (let i = 0; i < WORD_SIZE - 1; i++) {
        result.setTri(i, val[i + 1].state);
    }
    result[WORD_SIZE - 1].setTri(filler);
    return result.readBus();
}

//Left shift
export function LShift(val) {
    return LMove(val, 0)
}

//Right shift
export function RShift(val) {
    return RMove(val, 0)
}

//Rotate left
export function LRot(val) {
    let filler = val[WORD_SIZE - 1];
    return LMove(val, filler.state)
}

//Rotate Right
export function RRot(val) {
    let filler = val[0];
    return RMove(val, filler.state)
}
