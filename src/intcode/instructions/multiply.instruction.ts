import { Instruction } from "../instruction";
import { Program } from "../program";
import { Computer } from "../computer";
import { Process } from "../process";
import { Memory } from "../memory";
import { InstructionResult } from "../instruction-result";
import { InstructionOptions } from "../instruction-options";

export class MultiplyInstruction extends Instruction {

    public execute(options: InstructionOptions, process: Process): number {
        const input1 = this.getParameterValue(process, options, 1)
        const input2 = this.getParameterValue(process, options, 2)
        const output = process.getMemory().read(process, process.getInstructionPointer() + 3)
        process.getMemory().write(process, process.getMemoryAllocation().startAddress + output, input1 * input2)
        return InstructionResult.OK
    }

    public getParameterCount(): number {
        return 3
    }
    
}