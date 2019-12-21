import { Instruction } from "../instruction";
import { Program } from "../program";
import { Computer } from "../computer";
import { Process } from "../process";
import { Memory } from "../memory";
import { InstructionResult } from "../instruction-result";
import * as prompt from "prompt-sync"
import { InstructionOptions } from "../instruction-options";

const console = prompt()

export class InputInstruction extends Instruction {

    public execute(options: InstructionOptions, process: Process): number { 
        const address = process.getMemory().read(process, process.getInstructionPointer() + 1)
        const input = +console("> ")
        process.getMemory().write(process, process.getMemoryAllocation().startAddress + address, input)
        return InstructionResult.OK
    }

    public getParameterCount(): number {
        return 1
    }
    
}