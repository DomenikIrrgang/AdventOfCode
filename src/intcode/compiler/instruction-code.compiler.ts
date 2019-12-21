import { Compiler } from "./compiler";
import { CompilerOptions } from "./compiler-options";
import { Program } from "../program";
import { ArrayProgram } from "../programs/array.program";
import * as fs from "fs"

const instructionMap = {
    "ADD": 1,
    "MUL": 2,
    "INP": 3,
    "OUT": 4,
    "JIT": 5,
    "JIF": 6,
    "LTH": 7,
    "EQU": 8,
    "BAS": 9,
    "JMP": 60,
    "EXT": 99
}

export class InstructionCodeCompiler implements Compiler {

    public compile(path: string, compilerOptions?: CompilerOptions): Program {
        const program = []
        const lines = fs.readFileSync(path).toString().split("\n")
        for (let line of lines) {
            program.push(... this.parseLine(line))
        }
        return new ArrayProgram(path.split("/").pop(), program)
    }

    private parseLine(line: string): number[] {
        const instruction = line.split(" ")
        const tmp: number[] = [this.getInstructionCode(instruction)]
        for (let i = 1; i < instruction.length; i++) {
            tmp.push((instruction[i][0] === '#' || instruction[i][0] === '~') ? +instruction[i].substring(1) : +instruction[i])
        }
        return tmp
    }

    private getInstructionCode(instruction: string[]): number {
        const opCode = instructionMap[instruction[0]]
        if (opCode === undefined) {
            throw new Error(`Instruction "${instruction[0]}" is not supported.`)
        }
        let tmp = (opCode < 10) ? "0" + opCode : opCode.toString()
        for (let i = 1; i < instruction.length; i++) {
            tmp = this.getParameterMode(instruction[i]) + tmp
        }
        return +tmp
    }

    private getParameterMode(parameter: string): number {
        return (parameter[0] === '#') ? 1 : (parameter[0] === '~') ? 2 : 0
    }

}