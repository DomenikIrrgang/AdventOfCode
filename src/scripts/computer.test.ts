import { Computer } from "../intcode/computer";
import { Idle } from "../intcode/programs/idle.program";
import { TestProgramm } from "../intcode/programs/test.program";

const computer = new Computer()
computer.start()
computer.loadProgram(new TestProgramm())
computer.loadProgram(new TestProgramm())
computer.loadProgram(new TestProgramm())
computer.loadProgram(new TestProgramm())