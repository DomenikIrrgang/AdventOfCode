import { MemoryAllocation } from "./memory-allocation"
import { Program } from "./program"
import { Memory } from "./memory"
import { ProcessPriority } from "./process-priority"

export class Process {

    private instructionPointer: number

    public constructor(private id: number, private name: string, private program: Program, private memory: Memory, private memoryAllocation: MemoryAllocation = undefined, private priority: ProcessPriority = ProcessPriority.LOW, private callback: (process: Process, exitCode: number) => void = () => {}) { }

    public getId(): number {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getMemoryAllocation(): MemoryAllocation {
        return this.memoryAllocation
    }

    public setMemoryAllocation(memoryAllocation: MemoryAllocation): void {
        this.memoryAllocation = memoryAllocation
    }

    public getProgram(): Program {
        return this.program
    }

    public getInstructionPointer(): number {
        return this.instructionPointer
    }

    public setInstructionPointer(instructionPointer): void {
        this.instructionPointer = instructionPointer
    }

    public getMemory(): Memory {
        return this.memory
    }

    public getPriority(): ProcessPriority {
        return this.priority
    }

    public setPriority(priority: ProcessPriority): void {
        this.priority = priority
    }

    public setCallback(callback: (process: Process, exitCode: number) => void): void {
        this.callback = callback
    }

    public getCallback(): (process: Process, exitCode: number) => void {
        return this.callback
    }

}