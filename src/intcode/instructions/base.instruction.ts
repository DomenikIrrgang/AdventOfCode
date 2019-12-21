import { Instruction } from "../instruction";
import { Process } from "../process";
import { InstructionResult } from "../instruction-result";
import { InstructionOptions } from "../instruction-options";

export class BaseInstruction extends Instruction {

    public execute(options: InstructionOptions, process: Process): number {
        const value = this.getParameterValue(process, options, 1)
        process.setRelativebase(process.getRelativeBase() + value)
        return InstructionResult.OK
    }

    public getParameterCount(): number {
        return 1
    }
    
}