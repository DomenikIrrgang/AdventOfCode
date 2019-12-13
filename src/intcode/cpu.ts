import { Instruction } from "./instruction";
import { AddInstruction } from "./instructions/add.instruction";
import { MultiplyInstruction } from "./instructions/multiply.instruction";
import { ExitInstruction } from "./instructions/exit.instruction";
import { Memory } from "./memory";
import { Process } from "./process";
import { JumpInstruction } from "./instructions/jump.instruction";

export class Cpu {

    private instructionSet: Map<number, Instruction> = new Map()

    public constructor(private frequenzy: number, private memory: Memory) {
        this.instructionSet.set(1, new AddInstruction())
        this.instructionSet.set(2, new MultiplyInstruction())
        this.instructionSet.set(999, new JumpInstruction())
        this.instructionSet.set(99, new ExitInstruction())
    }

    public cycle(process: Process): number {
        const instruction = this.instructionSet.get(this.memory.read(process, process.getInstructionPointer()))
        const instructionResult = instruction.execute(process)
        process.setInstructionPointer(process.getInstructionPointer() + instruction.getParameterCount() + 1)
        return instructionResult
    }

    public getFrequency(): number {
        return this.frequenzy
    }
}