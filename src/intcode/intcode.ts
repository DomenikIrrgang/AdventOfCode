import { Program } from "./program";
import { Computer } from "./computer";
import { Instruction } from "./instruction";
import { AddInstruction } from "./add-command";
import { MultiplyInstruction } from "./multiply-command";
import { ExitInstruction } from "./exit-command";

export class Intcode implements Program {

    private commands: Map<number, Instruction> = new Map()
    private exitCode: number = undefined
    private instructionPointer = 0

    public constructor(private name: string, private memory: number[]) {
        this.commands.set(1, new AddInstruction())
        this.commands.set(2, new MultiplyInstruction())
        this.commands.set(99, new ExitInstruction())
    }

    public getName(): string {
        return this.name
    }

    public getMemory(): number[] {
        return this.memory
    }
    
    public run(computer: Computer): number {
        while (this.exitCode === undefined) {
            this.commands.get(this.memory[this.instructionPointer]).execute(
                this,
                this.memory[this.instructionPointer + 1],
                this.memory[this.instructionPointer + 2],
                this.memory[this.instructionPointer + 3])
            this.instructionPointer += this.commands.get(this.memory[this.instructionPointer]).getParameterCount() + 1
        }
        return this.exitCode
    }

    public finish() {
        this.exitCode = 0
    }

    public abort() {
        this.exitCode = 1
    }

    public writeMemory(address: number, value: number): void {
        this.memory[address] = value
    }

    public readMemory(address: number): number {
        return this.memory[address]
    }

}