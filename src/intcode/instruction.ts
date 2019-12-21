import { Process } from "./process";
import { Memory } from "./memory";
import { InstructionOptions } from "./instruction-options";

export abstract class Instruction {
    public abstract execute(options: InstructionOptions, process: Process): number
    public abstract getParameterCount(): number

    protected getParameterValue(process: Process, options: InstructionOptions, parameter: number): number {
        switch (options.parameterModes[parameter - 1]) {
            case 2: {
                const address = process.getMemory().read(process, process.getInstructionPointer() + parameter)
                return process.getMemory().read(process, process.getMemoryAllocation().startAddress + process.getRelativeBase() + address)
            }
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

    protected getAddress(process: Process, options: InstructionOptions, parameter: number, address: number): number {
        return (options.parameterModes[parameter - 1] == 2) ? process.getRelativeBase() + address : address
    }

    protected getOutputAddress(process: Process, options: InstructionOptions, parameter: number): number {
        return this.getAddress(process, options, parameter, process.getMemory().read(process, process.getInstructionPointer() + parameter))
    }
}