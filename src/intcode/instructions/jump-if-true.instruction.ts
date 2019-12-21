import { Instruction } from "../instruction";
import { Process } from "../process";
import { InstructionResult } from "../instruction-result";
import { InstructionOptions } from "../instruction-options";

export class JumpIfTrueInstruction extends Instruction {

    public execute(options: InstructionOptions, process: Process): number {
        const value = this.getParameterValue(process, options, 1)
        if (value !== 0) {
            process.setInstructionPointer(this.getParameterValue(process, options, 2) - this.getParameterCount() - 1)
        }
        return InstructionResult.OK
    }

    public getParameterCount(): number {
        return 2
    }
    
}