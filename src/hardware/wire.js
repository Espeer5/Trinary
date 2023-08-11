/**
 * Extremely simple implementation of a wire in which a wire is just a voltge 
 * carrier, allowing the passage of a voltage from one component to another.
 * 
 * @property {number} voltage The voltage across the wire
 */
export class Wire {
    voltage = 0;

    /**
     * Sets the voltage across a wire
     * 
     * @param {number} voltage The voltage to set the wire to
     */
    set_v(v) {
        this.voltage = v;
    }
}