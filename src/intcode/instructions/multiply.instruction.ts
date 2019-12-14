import { Instruction } from "../instruction";
import { Program } from "../program";
import { Computer } from "../computer";
import { Process } from "../process";
import { Memory } from "../memory";
import { InstructionResult } from "../instruction-result";

export class MultiplyInstruction implements Instruction {

    public execute(process: Process): number {
        const input1 = process.getMemory().read(process, process.getInstructionPointer() + 1)
        const input2 = process.getMemory().read(process, process.getInstructionPointer() + 2)
        const output = process.getMemory().read(process, process.getInstructionPointer() + 3)
        process.getMemory().write(process, process.getMemoryAllocation().startAddress + output, process.getMemory().read(process, process.getMemoryAllocation().startAddress + input1) * process.getMemory().read(process, process.getMemoryAllocation().startAddress + input2))
        return InstructionResult.OK
    }

    public getParameterCount(): number {
        return 3
    }
    
}