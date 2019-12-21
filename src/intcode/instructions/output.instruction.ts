import { Instruction } from "../instruction";
import { Program } from "../program";
import { Computer } from "../computer";
import { Process } from "../process";
import { Memory } from "../memory";
import { InstructionResult } from "../instruction-result";
import * as readline from "readline-sync"
import { InstructionOptions } from "../instruction-options";

export class OutputInstruction extends Instruction {

    public execute(options: InstructionOptions, process: Process): number { 
        const output = this.getParameterValue(process, options, 1)
        console.log(output)
        return InstructionResult.OK
    }

    public getParameterCount(): number {
        return 1
    }
    
}