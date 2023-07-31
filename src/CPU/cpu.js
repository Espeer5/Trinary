// This file instantiates the trinary CPU with all necessary hardware structures

import {Word} from "../representation/word.js"
import { ALU } from "./alu.js";
import { IOBus } from "../representation/IOBus.js";
import { AbsractDevice } from "../representation/device.js";

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
        console.log(this.alu.output.readBus());
        this.accumulator.writeWord(this.alu.output.readBus());
    }
}
