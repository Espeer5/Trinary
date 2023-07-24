// This module describes an arithmetic logic unit for the CPU

import {AddSub, ThreeOne, NineTwo} from "./circuits.js"
import * as gates from "../base/gates.js"
import { WORD_SIZE } from "../base/constants.js"
import {Tri} from "../base/tri.js"

function wordMap(funct, val) {
    result = new Array(WORD_SIZE).fill(new Tri());
    for (i = 0; i < WORD_SIZE; i++) {
        result[i].setState(funct(val[i]));
    }
}

function wordMap2(funct, val1, val2) {
    result = new Array(WORD_SIZE).fill(new Tri());
    for (i = 0; i < WORD_SIZE; i++) {
        result[i].setState(funct(val1[i].state, val2[i].state));
    }
    return result
}

class FBlock {
    DBIn1;
    DBIn2;
    selects;
    mux = new NineTwo();
    result;
    constructor() {
        this.mux.sigs = selects;
    }

    compute() {
        this.mux.outs = [
            wordMap2(gates.MIN, this.DBIn1, this.DBIn2), 
            wordMap2(gates.MAX, this.DBIn1, this.DBIn2),
            wordMap(gates.INV, this.DBIn1),
            wordMap(gates.INV, this.DBIn2),
            wordMap2(gates.CONS, this.DBIn1, this.DBIn2),
            wordMap2(gates.ANY, this.DBIn1, this.DBIn2),
            wordMap2(gates.MUL, this.DBIn1, this.DBIn2),
            wordMap2(gates.ADD, this.DBIn1, this.DBIn2)
        ];
        this.mux.select();
        this.result = this.mux.out;
    }
}

export class ALU {
    //Internal logic blocks
    addsub = new AddSub();
    fblock = new FBlock();
    mux = new ThreeOne();
    out;

    constructor(DBIn1, DBIn2, signal_lines) {
        // input data busses
        this.DBIn1 = DBIn1;
        this.DBIn2 = DBIn2;

        // control signals
        this.signal_lines = signal_lines;

        // wire up the adder/subtractor
        this.addsub.wordIn1 = DBIn1;
        this.addsub.WordIn2 = this.DBIn2;
        this.addsub.control = this.signal_lines[0];

        // wire up the fblock
        this.fblock.DBIn1 = this.DBIn1;
        this.fblock.DBIn2 = this.DBIn2;
        this.fblock.selects = this.signal_lines.slice(2, 4);

        //Wire up the mux
        this.mux.out1 = this.addsub.result;
        this.mux.out2 = this.addsub.result;
        this.mux.sig = this.signal_lines[4]; 
    }

    compute() {
        this.addsub.compute();
        this.fblock.compute();
        this.mux.select();
        this.result = this.mux.out;
    }
}