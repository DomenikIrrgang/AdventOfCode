import { Computer } from "../intcode/computer";
import * as fs from "fs"
import { FileProgram } from "../intcode/programs/file.program";
import { ProcessPriority } from "../intcode/process-priority";
import { Process } from "../intcode/process";

let computer = new Computer()
const program = new FileProgram("files/day2/program.int")
computer.start()

for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
        computer.loadProgram(program, ProcessPriority.LOW, (process: Process) => {
            if (process.getMemory().read(process, process.getMemoryAllocation().startAddress) === 19690720) {
                console.log("Result found! noun=", noun, "verb=", verb)
                console.log("Answer is:", 100 * noun + verb)
            }
        })
    }
}

/*
let computer = new Computer()
let input = fs.readFileSync("files/day2/program", "utf8")

for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
        let intcode = input.split(",").map((value => +value)) as unknown as number[]
        intcode[1] = noun
        intcode[2] = verb
        let program = new Intcode("SampleProgram", intcode)
        computer.runProgram(program)
        if (program.readMemory(0) === 19690720) {
            console.log("Result found! noun=", noun, "verb=", verb)
            console.log("Answer is:", 100 * noun + verb)
        }
    }
}*/