// This module describes an arithmetic logic unit for the CPU

import {AddSub, ThreeOne, NineTwo} from "./circuits.js"
import * as gates from "../TriArithmetic/gates.js"
import * as SR from "../TriArithmetic/shiftRot.js"
import {Tri} from "../representation/tri.js"
import { IOBus } from "../representation/IOBus.js"
import { wordMap, wordMap2 } from "../TriArithmetic/gates.js"

// The F-block allows the ALU to output Tri-wise mapped gate operations between 
// 2 input busses
class FBlock {
    DBIn1;
    DBIn2;
    mux = new NineTwo();
    result = new IOBus();
    constructor(selects) {
        this.selects = selects;
        this.mux.sigs = this.selects;
    }

    compute() {
        let dataIn1 = this.DBIn1.readBus();
        let dataIn2 = this.DBIn2.readBus();
        this.mux.outs = [
            wordMap2(gates.MIN, dataIn1, dataIn2), 
            wordMap2(gates.MAX, dataIn1, dataIn2),
            wordMap(gates.INV, dataIn1),
            wordMap(gates.INV, dataIn2),
            wordMap2(gates.CONS, dataIn1, dataIn2),
            wordMap2(gates.ANY, dataIn1, dataIn2),
            wordMap2(gates.MUL, dataIn1, dataIn2),
            wordMap2(gates.ADD, dataIn1, dataIn2)
        ];
        this.mux.select();
        this.result.writeBus(this.mux.out);
    }
}

class ShiftRotate {
    DBIn;
    mux = new NineTwo();
    result = new IOBus();
    constructor(selects) {
        this.selects = selects;
        this.mux.sigs = this.selects;
    }

    compute() {
        this.mux.outs = [
            SR.LShift(this.DBIn.readBus()),
            SR.RShift(this.DBIn.readBus()),
            SR.LRot(this.DBIn.readBus()),
            SR.RRot(this.DBIn.readBus())
        ];
        this.mux.select();
        this.result.writeBus(this.mux.out);
    }
}

export class ALU {
    //Internal logic blocks
    addsub;
    mux = new ThreeOne();
    out = new IOBus();

    constructor(DBIn1, DBIn2, signal_lines) {
        // input data busses
        this.DBIn1 = DBIn1;
        this.DBIn2 = DBIn2;

        // control signals
        this.signal_lines = signal_lines;

        // wire up the adder/subtractor
        this.addsub = new AddSub(this.signal_lines.data[0], DBIn1, DBIn2, new Tri());

        // wire up the fblock
        this.fblock = new FBlock(this.signal_lines.data.slice(1, 3));
        this.fblock.DBIn1 = this.DBIn1;
        this.fblock.DBIn2 = this.DBIn2;

        //Wire up the Shifter/Rotater block
        this.shiftRot = new ShiftRotate(this.signal_lines.data.slice(4, 6));
        this.shiftRot.DBIn = this.DBIn1;

        //Wire up the mux
        this.mux.out1 = this.fblock.result;
        this.mux.out2 = this.addsub.result;
        this.mux.out3 = this.shiftRot.result;
        this.mux.sig = this.signal_lines.data[3];
    }

    compute() {
        this.addsub.compute();
        this.fblock.compute();
        this.shiftRot.compute();
        this.mux.select();
        this.out = this.mux.out;
        console.log(this.out);
    }
}
