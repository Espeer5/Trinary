/**
 * This file provides a representation of a CNTFET, a carbon nano-tube field 
 * effect transistor. CNTFETs show more promising performance in multi-valued 
 * logic than traditional CMOS transistors. The CNTFET is a device whose 
 * conductance and threshold voltage are controlled by its chirality, 
 * parameterized by the chirality vector (n, m). We may then build multi-level 
 * logic gates by using multiple CNTFETs in a network with different chiralities
 * giving different threshold voltages. See S. Lin, Y. -B. Kim and F. Lombardi,
 * "CNTFET-Based Design of Ternary Logic Gates and Arithmetic Circuits," 
 * in IEEE Transactions on Nanotechnology, vol. 10, no. 2, pp. 217-225, 
 * March 2011, doi: 10.1109/TNANO.2009.2036845.
 */

import * as consts from "./hardw_const.js";
import { Wire } from "./wire.js";
import { AbstractVNode } from "./vNetNode.js";

/**
 * Representation of a CNTFET with the gate, source, and drain carried in wires 
 * and computed based on the chirality vector (n, m) of the CNTFET. The only 
 * public method is set_drain, which sets the CNTFET output voltage based on the 
 * input and the voltage applied to the gate.
 * 
 * @property {Wire} gate The wire supplying gate voltage of the CNTFET
 * @property {number} diameter The diameter of the CNTFET in nm
 * @property {number} threshold The threshold voltage of the CNTFET in V
 * @property {(number, number)} #c_v The chirality vector of the CNTFET
 * @extends AbstractVNode
 */
export class CNTFET extends AbstractVNode{
    /**
     * Creates a CNTFET with the given chirality vector (n, m)
     * 
     * @param {number} n The n parameter of the chirality vector
     * @param {number} m The m parameter of the chirality vector
     * @param {Wire} source The wire suplying source voltage of the CNTFET
     * @param {Wire} gate The wire suplying gate voltage of the CNTFET
     * @constructor
     */
    constructor(n, m, source, gate) {
        super();
        this.sources = [source, gate];
        this.#c_v = (n, m);
        this.diameter = this.#compute_diameter();
        this.threshold = this.#compute_threshold();
        this.set_drain();
    }

    /**
     * Overrides the add_source method of AbstractVNode to prevent multiple
     * sources from being added to the CNTFET. This forces the CNTFET sources to 
     * adhere to [source, gate] enforced by the constructor.
     * 
     * @param {*} source 
     */
    add_source(source) {
        throw new Error("CNTFET does not support multiple sources");
    }

    /**
     * Computes the diameter of the CNTFET based on its chirality vector
     * 
     * @returns {number} The diameter of the CNTFET in nm
     */
    #compute_diameter() {
        let n = this.#c_v[0];
        let m = this.#c_v[1];
        return Math.sqrt(3) * consts.inter_atomic_distance *
            Math.sqrt(n**2 + n*m + m**2) / Math.PI;
    }

    /**
     * Computes the threshold voltage of the CNTFET based on its diameter
     * 
     * @returns {number} The threshold voltage of the CNTFET in V
     */
    #compute_threshold() {
        return Math.sqrt(3) * consts.c_atomic_distance * consts.v_pi / 
            (3 * this.diameter * consts.e)
    }

    /**
     * Sets the drain voltage of the CNTFET based on the gate voltage
     */
    set_drain() {
        if (this.sources[1].voltage > this.threshold) {
            this.drain.set_v(this.sources[0].voltage);
        } else {
            this.drain.set_v(0);
        }
    }

}