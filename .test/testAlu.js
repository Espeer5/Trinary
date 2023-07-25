const core = require('@actions/core');
const github = require('@actions/github');

try {
    console.log("running");
    let cpu = new CPU();

    cpu.alu.DBIn1[0].setState(1);
    cpu.alu.DBIn2[0].setState(1);
    cpu.alu.signal_lines[0].setState(0);
    cpu.alu.signal_lines[1].setState(0);
    cpu.alu.signal_lines[2].setState(0);
    cpu.alu.signal_lines[3].setState(1);
    cpu.alu.signal_lines[4].setState(-1);
    cpu.alu.signal_lines[5].setState(-1);
    cpu.compute();

    console.log(cpu.accumulator.toString());
    console.log(wordToDec(cpu.accumulator));
    console.log(cpu.alu.addsub.carry);
    cpu.alu.DBIn1[0].setState(0);
    cpu.alu.DBIn1[1].setState(1);
    cpu.compute();
    console.log(wordToDec(cpu.accumulator));
} catch (error) {
    core.setFailed(error.message);
  }