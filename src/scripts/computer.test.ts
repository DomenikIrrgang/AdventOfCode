import { Computer } from "../intcode/computer";
import { TestProgramm } from "../intcode/programs/test.program";
import { FileProgram } from "../intcode/programs/file.program";
import { ProcessPriority } from "../intcode/process-priority";

const computer = new Computer()
const program = new FileProgram("files/day2/program.int")
computer.start()

for (let i = 0; i < 10000; i++) {
    computer.loadProgram(program)
    computer.run()
}