// This module describes an arithmetic logic unit for the CPU

import {AddSub} from "./circuits.js"

class FBlock {
    constructor()
}

export class ALU {
    //Internal structure based on an adder/subtractor circuit
    adder = new AddSub();
    
    //Input Databusses
    DBIn1;
    DBIn2;

    constructor(signal_reg) {
        this.sigs = signal_reg;
    }

    
}