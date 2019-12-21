import { Computer } from "../intcode/computer";
import { TestProgramm } from "../intcode/programs/test.program";
import { FileProgram } from "../intcode/programs/file.program";
import { ProcessPriority } from "../intcode/process-priority";

const computer = new Computer()
const program = new FileProgram("files/day5/diagnostic.int")
computer.start()
computer.loadProgram(program)
computer.run()