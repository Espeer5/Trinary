/**
 * This module describes an arithmetic logic unit for the CPU. An ALU is a
 * combinational logic device which performs arithmetic and tritwise operations
 * on two input busses. The ALU is controlled by a set of control signals which
 * determine which operation is performed and are specified by the CPU control
 * unit. The ALU has output bus is set to the output of a mux, which selects
 * from the output of an internal shifter/rotater block, an fblock which
 * computes tritwise operations, and an adder/subtractor block.
 */

import { AddSub, ThreeOne, NineTwo } from "./cpu_devices.js";
import * as gates from "../TriArithmetic/gates.js";
import * as SR from "../TriArithmetic/shiftRot.js";
import { Tri } from "../representation/tri.js";
import { wordMap, wordMap2 } from "../TriArithmetic/gates.js";
import { AbsractDevice } from "../representation/device.js";
import { IOBus } from "../representation/IOBus.js";

/**
 * The FBlock is a combinational logic device which performs tritwise operations
 * on two input busses based on the control signals from the CPU control unit.
 *
 * @property {NineTwo} mux - the mux which selects the output of the FBlock
 * @extends AbsractDevice
 */
class FBlock extends AbsractDevice {
  mux = new NineTwo();

  /**
   * Create a new FBlock
   *
   * @param {IOBus} DBIn1 - the first input data bus
   * @param {IOBus} DBIn2 - the second input data bus
   * @param {Tri[]} selects - the control signals from the CPU control unit
   * @constructor
   */
  constructor(DBIn1, DBIn2, selects) {
    super();
    this.addInput(DBIn1);
    this.addInput(DBIn2);
    this.mux.sigs = selects;
  }

  /**
   * Compute the output of the FBlock
   */
  compute() {
    let dataIn1 = this.inputs[0].readBus();
    let dataIn2 = this.inputs[1].readBus();
    // The allowed gate operations are mapped to the mux output
    this.mux.outs = [
      wordMap2(gates.MIN, dataIn1, dataIn2),
      wordMap2(gates.MAX, dataIn1, dataIn2),
      wordMap(gates.INV, dataIn1),
      wordMap(gates.INV, dataIn2),
      wordMap2(gates.CONS, dataIn1, dataIn2),
      wordMap2(gates.ANY, dataIn1, dataIn2),
      wordMap2(gates.MUL, dataIn1, dataIn2),
      wordMap2(gates.ADD, dataIn1, dataIn2),
    ];
    // Select the output of the mux and write it to the output bus
    this.mux.select();
    this.output.writeBus(this.mux.out);
  }
}

/**
 * The ShiftRotate block is a combinational logic device which performs shift
 * and rotate operations on the input data bus based on the control signals from
 * the CPU control unit.
 *
 * @property {NineTwo} mux - the mux which selects the output of the ShiftRotate
 * @extends AbsractDevice
 */
class ShiftRotate extends AbsractDevice {
  mux = new NineTwo();
  /**
   * Create a new ShiftRotate block
   *
   * @param {IOBus} DBIn - the input data bus
   * @param {Tri[]} selects - the control signals from the CPU control unit
   * @constructor
   */
  constructor(DBIn, selects) {
    super();
    this.addInput(DBIn);
    this.mux.sigs = selects;
  }

  /**
   * Compute the output of the ShiftRotate block
   */
  compute() {
    let dataIn = this.inputs[0].readBus();
    // The allowed shift/rotate operations are mapped to the mux output
    this.mux.outs = [
      SR.LShift(dataIn),
      SR.RShift(dataIn),
      SR.LRot(dataIn),
      SR.RRot(dataIn),
    ];
    // Select the output of the mux and write it to the output bus
    this.mux.select();
    this.output.writeBus(this.mux.out);
  }
}

/**
 * The ALU is a combinational logic device which performs arithmetic and
 * tritwise operations on two input busses. The ALU is controlled by a set of
 * control signals which determine which operation is performed and are
 * specified by the CPU control unit. The ALU has output bus is set to the
 * output of a mux, which selects from the output of an internal shifter/rotater
 * block, an fblock which computes tritwise operations, and an adder/subtractor
 * block.
 *
 * @property {Tri[]} signal_lines - the control signals from the CPU control unit
 * @property {AddSub} addsub - the adder/subtractor block
 * @property {FBlock} fblock - the fblock
 * @property {ShiftRotate} shiftRot - the shifter/rotater block
 * @property {ThreeOne} mux - the mux which selects the output of the ALU
 * @extends AbsractDevice
 */
export class ALU extends AbsractDevice {
  //Internal logic blocks
  mux = new ThreeOne();

  /**
   * Create a new ALU
   *
   * @param {IOBus} DBIn1 - the first input data bus
   * @param {IOBus} DBIn2 - the second input data bus
   * @param {Tri[]} signal_lines - the control signals from the CPU control unit
   */
  constructor(DBIn1, DBIn2, signal_lines) {
    super();
    // input data busses
    this.addInput(DBIn1);
    this.addInput(DBIn2);

    // control signals
    this.signal_lines = signal_lines;

    // wire up the adder/subtractor
    this.addsub = new AddSub(
      this.signal_lines.data[0],
      this.inputs[0],
      this.inputs[1],
      new Tri(),
    );

    // wire up the fblock
    this.fblock = new FBlock(
      this.inputs[0],
      this.inputs[1],
      this.signal_lines.data.slice(1, 3),
    );

    //Wire up the Shifter/Rotater block
    this.shiftRot = new ShiftRotate(
      this.inputs[0],
      this.signal_lines.data.slice(4, 6),
    );

    //Wire up the mux
    this.mux.out1 = this.fblock.output;
    this.mux.out2 = this.addsub.output;
    this.mux.out3 = this.shiftRot.output;
    this.mux.sig = this.signal_lines.data[3];
  }

  /**
   * Set the control signals for the ALU to the values in the given instruction
   *
   * @param {Tri[]} instruction - the control signals from the CPU control unit
   */
  writeInstruction(instruction) {
    for (let i = 0; i < instruction.length; i++) {
      this.signal_lines.data[i].setState(instruction[i].state);
    }
  }

  /**
   * Compute the output of the ALU
   */
  compute() {
    // Compute the output of each internal logic block
    this.addsub.compute();
    this.fblock.compute();
    this.shiftRot.compute();
    // Select the output of the mux and write it to the output bus
    this.mux.select();
    this.output.writeBus(this.mux.out.readBus());
  }
}
