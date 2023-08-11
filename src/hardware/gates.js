/**
 * This file contains the hardware implementations of the CNTFET logic gates 
 * used in the ternary CPU. There is a translation level which translates gate 
 * inputs and outputs into logical ones.
 */

import { AbstractVNode } from "./vNetNode.js";
import { CNTFET } from "./CNTFET";

export class STI extends AbstractVNode {

    constructor(source) {
        super();
        this.sources = [source];
        this.v_d_d = new Wire();
        this.v_d_d.set_voltage(consts.supply_V);
        this.t1 = new CNTFET(19, 0, this.);
        this.set_drain();
    }

}