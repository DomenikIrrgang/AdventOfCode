import { Computer } from "../intcode/computer";
import * as fs from "fs"

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