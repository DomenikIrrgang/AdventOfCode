import { Computer } from "../intcode/computer";
import { TestProgramm } from "../intcode/programs/test.program";
import { FileProgram } from "../intcode/programs/file.program";
import { ProcessPriority } from "../intcode/process-priority";

const computer = new Computer()
computer.start()
computer.loadProgram(new TestProgramm())
computer.loadProgram(new TestProgramm(), ProcessPriority.MEDIUM)
computer.loadProgram(new TestProgramm(), ProcessPriority.HIGH)
computer.loadProgram(new TestProgramm())
computer.loadProgram(new FileProgram("files/day2/program.int"), ProcessPriority.HIGH, (process, exitCode) => {
    console.log(process.getId())
})