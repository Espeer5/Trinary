// This file instantiates the trinary CPU with all necessary hardware structures

import {Word} from "../representation/word.js"
import { ALU } from "./alu.js";
import { Tri } from "../representation/tri.js";
import { WORD_SIZE } from "../representation/constants.js";

export class CPU {
    // One-word accumulator
    accumulator = new Word();

    // One-word flags register
    flags = new Word();

    constructor() {
        let aluIn1 = [];
        let aluIn2 = [];
        let aluControl = [];
        for (let i = 0; i < WORD_SIZE; i++) {
            aluIn1[i] = new Tri();
            aluIn2[i] = new Tri();
            aluControl[i] = new Tri();
        }
        this.alu = new ALU(aluIn1, aluIn2, aluControl);
    }

    compute() {
        this.alu.compute();
        this.accumulator.writeWord(this.alu.out);
    }
}
