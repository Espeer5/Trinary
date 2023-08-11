/** 
 * This file implements an abstract node for use in a voltage network. Our 
 * voltage networks will be structured as one large node, which contains 
 * internal nodes which are all linked together. This structure will allow us to
 * link many CNTFET based components together in a voltage network and compute 
 * the output voltage simplistically based on the input voltages. This is NOT 
 * a circuit simulation.
 */

import { Wire } from "./wire.js";

export class AbstractVNode {
    sources = [];
    drain = new Wire();

    /**
     * Adds an input to the node, which is expected to be of the type Wire
     * 
     * @param {Wire} input 
     */
    add_source(source) {
        this.inputs.push(source);
    }

    /**
     * Computes the output voltage of the node based on its inputs
     */
    set_drain() {
        throw new Error("set_drain() not implemented for abstract type");
    }

}