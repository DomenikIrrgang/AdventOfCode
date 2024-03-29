import { Instruction } from "../instruction";
import { Process } from "../process";
import { Memory } from "../memory";
import { InstructionResult } from "../instruction-result";
import { InstructionOptions } from "../instruction-options";

export class JumpInstruction extends Instruction {

    public execute(options: InstructionOptions, process: Process): number {
        const address = process.getMemory().read(process, process.getInstructionPointer() + 1)
        process.setInstructionPointer(address - this.getParameterCount() - 1)
        return InstructionResult.OK
    }

    public getParameterCount(): number {
        return 1
    }
    
}