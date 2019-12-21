import { Process } from "./process";
import { Memory } from "./memory";
import { InstructionOptions } from "./instruction-options";

export abstract class Instruction {
    public abstract execute(options: InstructionOptions, process: Process): number
    public abstract getParameterCount(): number

    protected getParameterValue(process: Process, options: InstructionOptions, parameter: number): number {
        switch (options.parameterModes[parameter - 1]) {
            case 1:
                return process.getMemory().read(process, process.getInstructionPointer() + parameter)
            case 0: {
                const address = process.getMemory().read(process, process.getInstructionPointer() + parameter)
                return process.getMemory().read(process, process.getMemoryAllocation().startAddress + address)
            }
            case undefined: {
                const address = process.getMemory().read(process, process.getInstructionPointer() + parameter)
                return process.getMemory().read(process, process.getMemoryAllocation().startAddress + address)
            }
            default:
                return process.getMemory().read(process, process.getInstructionPointer() + parameter)
        }
    }
}