// Some utility circuits that are used in multiply places in the CPU

import { WORD_SIZE } from "../representation/constants.js"
import { IOBus } from "../representation/IOBus.js";
import * as gates from "../TriArithmetic/gates.js"
import { WordAdder } from "./adder.js"

export class AddSub {
    adder = new WordAdder();
    constructor(control, wordIn1, wordIn2, cIn) {
        this.cIn = cIn;
        this.wordIn1 = wordIn1;
        this.wordIn2 = wordIn2;
        this.control = control;
        this.adder.val1 = this.wordIn1;
        this.adder.val2 = new IOBus();
        this.adder.cIn = this.cIn;
    }
    result = this.adder.result;
    carry = this.adder.cOut;
    
    compute() {
        //Extend the control to a WORD_SIZE bus
        let temp = new IOBus();
        for (let i = 0; i < WORD_SIZE; i++) {
            temp.setTri(i, this.control);
        }
        this.adder.val2.writeBus(gates.wordMap2(gates.MUL, temp, this.wordIn2));
        this.adder.compute();
    }
}

//Muxes

export class ThreeOne {
    out1;
    out2;
    out3;
    out;
    sig;

    select() {
        if (this.sig.state == -1) {
            this.out = this.out1;
        } else if (this.sig.state == 0) {
            this.out = this.out2;
        } else {
            this.out = this.out3;
        }
    }
}

export class NineTwo {
    keyMap = new Map();
    outs;
    sigs;
    out;
    constructor() {
        this.keyMap.set("-1,-1", 0);
        this.keyMap.set("-1,0", 1);
        this.keyMap.set("-1,1", 2);
        this.keyMap.set("0,-1", 3);
        this.keyMap.set("0,0", 4);
        this.keyMap.set("0,1", 5);
        this.keyMap.set("1,-1", 6);
        this.keyMap.set("1,0", 7);
        this.keyMap.set("1,1", 8);
    }

    select() {
        let sigCode = this.sigs[0].state.toString()+ "," + this.sigs[1].state.toString();
        this.out = this.outs[this.keyMap.get(sigCode)];
    }
}
