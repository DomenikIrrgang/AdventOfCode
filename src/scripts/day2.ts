import { Computer } from "../intcode/computer";
import * as fs from "fs"
import { FileProgram } from "../intcode/programs/file.program";
import { ProcessPriority } from "../intcode/process-priority";
import { Process } from "../intcode/process";

const computer = new Computer()
const program = new FileProgram("files/day2/program.int")
computer.start()

for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
        program.getData()[1] = noun
        program.getData()[2] = verb
        computer.loadProgram(program, ProcessPriority.LOW, (process: Process) => {
            if (process.getMemory().read(process, process.getMemoryAllocation().startAddress) === 19690720) {
                console.log("Result found! noun=", noun, "verb=", verb)
                console.log("Answer is:", 100 * noun + verb)
            }
        })
        computer.run()
    }
}