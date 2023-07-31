// This module describes an arithmetic logic unit for the CPU

import {AddSub, ThreeOne, NineTwo} from "./circuits.js"
import * as gates from "../TriArithmetic/gates.js"
import * as SR from "../TriArithmetic/shiftRot.js"
import {Tri} from "../representation/tri.js"
import { IOBus } from "../representation/IOBus.js"
import { wordMap, wordMap2 } from "../TriArithmetic/gates.js"
import { AbsractDevice } from "../representation/device.js"

// The F-block allows the ALU to output Tri-wise mapped gate operations between 
// 2 input busses
class FBlock extends AbsractDevice {
    mux = new NineTwo();
    constructor(DBIn1, DBIn2, selects) {
        super();
        this.addInput(DBIn1);
        this.addInput(DBIn2);
        this.mux.sigs = selects;
    }

    compute() {
        let dataIn1 = this.inputs[0].readBus();
        let dataIn2 = this.inputs[1].readBus();
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
        this.output.writeBus(this.mux.out);
    }
}

class ShiftRotate extends AbsractDevice {
    mux = new NineTwo();
    constructor(DBIn, selects) {
        super();
        this.addInput(DBIn);
        this.mux.sigs = selects;
    }

    compute() {
        let dataIn = this.inputs[0].readBus();
        this.mux.outs = [
            SR.LShift(dataIn),
            SR.RShift(dataIn),
            SR.LRot(dataIn),
            SR.RRot(dataIn),
        ];
        this.mux.select();
        this.output.writeBus(this.mux.out);
    }
}

export class ALU extends AbsractDevice{
    //Internal logic blocks
    mux = new ThreeOne();

    constructor(DBIn1, DBIn2, signal_lines) {
        super();
        // input data busses
        this.addInput(DBIn1);
        this.addInput(DBIn2);

        // control signals
        this.signal_lines = signal_lines;

        // wire up the adder/subtractor
        this.addsub = new AddSub(this.signal_lines.data[0], this.inputs[0], 
            this.inputs[1], new Tri());

        // wire up the fblock
        this.fblock = new FBlock(this.inputs[0], this.inputs[1], 
            this.signal_lines.data.slice(1, 3));

        //Wire up the Shifter/Rotater block
        this.shiftRot = new ShiftRotate(this.inputs[0], 
            this.signal_lines.data.slice(4, 6));

        //Wire up the mux
        this.mux.out1 = this.fblock.output;
        this.mux.out2 = this.addsub.output;
        this.mux.out3 = this.shiftRot.output;
        this.mux.sig = this.signal_lines.data[3];
    }

    compute() {
        this.addsub.compute();
        this.fblock.compute();
        this.shiftRot.compute();
        this.mux.select();
        this.output.writeBus(this.mux.out.readBus());
    }
}
