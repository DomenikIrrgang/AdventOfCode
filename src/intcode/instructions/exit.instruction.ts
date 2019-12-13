import { Instruction } from "../instruction";
import { Program } from "../program";
import { Computer } from "../computer";
import { Process } from "../process";
import { Memory } from "../memory";
import { InstructionResult } from "../instruction-result";

export class ExitInstruction implements Instruction {

    public execute(process: Process): number { 
        return InstructionResult.EXIT
    }

    public getParameterCount(): number {
        return 0
    }
    
}