import { Instruction } from "../instruction";
import { Program } from "../program";
import { Computer } from "../computer";
import { Process } from "../process";
import { Memory } from "../memory";
import { InstructionResult } from "../instruction-result";
import { InstructionOptions } from "../instruction-options";

export class ExitInstruction extends Instruction {

    public execute(options: InstructionOptions, process: Process): number { 
        return InstructionResult.EXIT
    }

    public getParameterCount(): number {
        return 0
    }
    
}