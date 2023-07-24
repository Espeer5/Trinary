// This module describes an arithmetic logic unit for the CPU

import {AddSub, ThreeOne, NineTwo} from "./circuits.js"
import * as gates from "../TriArithmetic/gates.js"
import { WORD_SIZE } from "../representation/constants.js"
import {Tri} from "../representation/tri.js"

//Runs every line in a bus through the same type of gate
function wordMap(funct, val) {
    let result = [];
    for (let i = 0; i < WORD_SIZE; i++) {
        result[i] = new Tri();
        result[i].setState(funct(val[i].state));
    }
}

//Runs each tri from the same lines of 2 different busses through the same 
// 2 input gate
function wordMap2(funct, val1, val2) {
    let result = [];
    for (let i = 0; i < WORD_SIZE; i++) {
        result[i] = new Tri();
        result[i].setState(funct(val1[i].state, val2[i].state));
    }
    return result
}

// The F-block allows the ALU to output Tri-wise mapped gate operations between 
// 2 input busses
class FBlock {
    DBIn1;
    DBIn2;
    mux = new NineTwo();
    result;
    constructor(selects) {
        this.selects = selects;
        this.mux.sigs = this.selects;
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
    addsub;
    mux = new ThreeOne();
    out;

    constructor(DBIn1, DBIn2, signal_lines) {
        // input data busses
        this.DBIn1 = DBIn1;
        this.DBIn2 = DBIn2;

        // control signals
        this.signal_lines = signal_lines;

        // wire up the adder/subtractor
        this.addsub = new AddSub(this.signal_lines[0], DBIn1, DBIn2, new Tri());

        // wire up the fblock
        this.fblock = new FBlock(this.signal_lines);
        this.fblock.DBIn1 = this.DBIn1;
        this.fblock.DBIn2 = this.DBIn2;
        this.fblock.selects = this.signal_lines.slice(1, 3);

        //Wire up the mux
        this.mux.out1 = this.addsub.result;
        this.mux.out2 = this.addsub.result;
        this.mux.sig = this.signal_lines[3];
    }

    compute() {
        this.addsub.compute();
        this.fblock.compute();
        this.mux.select();
        this.out = this.mux.out;
    }
}