/**
 * This file contains the registers of the CPU. The registers are managed as an 
 * array of pre-allocated words. The number of registers in the CPU is defined 
 * by the constant REGISTERS_COUNT under the system constants. The first
 * register (R00) is reserved as the system accumulator, the second register 
 * (R01) is reserved as the status register, the third register (R02) is 
 * reserved as the stack pointer, and the fourth register (RO3) is reserved as 
 * the program counter. The number of registers therefore must be at least 4.
 * The remaining registers are general purpose registers. Register access by 
 * users will be down through the read and write reg methods of the class, while
 * access to its own registers will be done through direct access to the 
 * internal array.
*/

import { Word } from "../representation/word.js";
import { REGISTERS_COUNT } from "../constants.js";


/**
 * The register array of the CPU.
 * 
 * @property {Word[]} registers - The array of CPU registers
*/
export class CPURegs {

    /**
     * Create the register array. The registers are pre-allocated as Word
     * objects. The number of registers is defined by the constant
     * REGISTERS_COUNT under the system constants. At least 4 registers are
     * required.
     */
    constructor() {
        if (REGISTERS_COUNT < 4) {
            console.error("Invalid number of registers");
        }
        this.registers = [];
        for (let i = 0; i < REGISTERS_COUNT; i++) {
            this.registers[i] = new Word();
        }
    }

    /**
     * Writes a word to the register specified by the index, which must be 
     * within the bounds of the size of the register array.
     *
     * @param {Tri[]} word - the word to write to the register
     * @param {number} index - the index of the register to write to
     * @throws {Error} - if the index is reserved or out of bounds
     */
    write_reg(data, index) {
        if(index <= 3 || index >= REGISTERS_COUNT) {
            console.error("Attempted write to reserved or invalid register");
        }
        this.registers[index].writeWord(data);
    }

    /**
     * Reads a word from the register specified by the index, which must be 
     * within the bounds of the size of the register array.
     *
     * @param {number} index - the index of the register to read from
     * @returns {Tri[]} - the word stored in the register
     * @throws {Error} - if the index is reserved or out of bounds
     */
    read_reg(index) {
        if(index <= 3 || index >= REGISTERS_COUNT) {
            throw new Error("Attempted read from reserved or invalid register");
        }
        return this.registers[index].readWord();
    }
}