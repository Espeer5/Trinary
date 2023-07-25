// This file instantiates the trinary CPU with all necessary hardware structures

import {Word} from "../representation/word.js"
import { ALU } from "./alu.js";
import { Tri } from "../representation/tri.js";
import { WORD_SIZE } from "../representation/constants.js";
import { IOBus } from "../representation/IOBus.js";

export class CPU {
    // One-word accumulator
    accumulator = new Word();

    // One-word flags register
    flags = new Word();

    constructor() {
        let aluIn1 = new IOBus();
        let aluIn2 = new IOBus();
        let aluControl = new IOBus();
        this.alu = new ALU(aluIn1, aluIn2, aluControl);
    }

    compute() {
        this.alu.compute();
        this.accumulator.writeWord(this.alu.out.readBus());
    }
}
