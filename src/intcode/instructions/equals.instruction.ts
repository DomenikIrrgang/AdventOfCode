import { Instruction } from "../instruction";
import { Process } from "../process";
import { InstructionResult } from "../instruction-result";
import { InstructionOptions } from "../instruction-options";

export class EqualsInstruction extends Instruction {

    public execute(options: InstructionOptions, process: Process): number {
        const value1 = this.getParameterValue(process, options, 1)
        const value2 = this.getParameterValue(process, options, 2)
        const output = process.getMemory().read(process, process.getInstructionPointer() + 3)
        process.getMemory().write(process, process.getMemoryAllocation().startAddress + output, (value1 === value2) ? 1 : 0)
        return InstructionResult.OK
    }

    public getParameterCount(): number {
        return 3
    }
    
}