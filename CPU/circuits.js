// Some utility circuits that are used in multiply places in the CPU

import { WORD_SIZE } from "../base/constants.js"
import { Tri } from "../base/tri.js"
import * as gates from "../base/gates.js"
import { WordAdder } from "./adder.js"

// If control is 1, buffers, is -1, negates, is 0, clears
export class WordClrNg {
    wordIn;
    control;
    result = new Array(WORD_SIZE).fill(new Tri());

    compute() {
        for (i = 0; i < WORD_SIZE; i++) {
            this.result[i].setState(gates.MUL(wordIn[i].state, control.state));
        }
    }
}

export class AddSub {
    wordIn1;
    wordIn2;
    setter = new WordClrNg();
    control = this.setter.control;
    adder = new WordAdder();
    constructor() {
        this.adder.val1 = this.wordIn1;
        this.adder.val2 = this.setter.result;
    }
    result = this.adder.result;
    carry = this.adder.carry;
    
    compute() {
        this.setter.compute();
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
        if (this.control.state == -1) {
            this.out = this.out1;
        } else if (this.control.state == 0) {
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
        sigCode = sigs[0].state.toString()+ "," + sigs[1].state.toString();
        this.out = this.outs[this.keyMap.get(sigCode)];
    }
}
