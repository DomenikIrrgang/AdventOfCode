import { Instruction } from "./instruction";
import { AddInstruction } from "./instructions/add.instruction";
import { MultiplyInstruction } from "./instructions/multiply.instruction";
import { ExitInstruction } from "./instructions/exit.instruction";
import { Memory } from "./memory";
import { Process } from "./process";
import { JumpInstruction } from "./instructions/jump.instruction";
import { InputInstruction } from "./instructions/input.instruction";
import { OutputInstruction } from "./instructions/output.instruction";
import { InstructionOptions } from "./instruction-options";
import { JumpIfTrueInstruction } from "./instructions/jump-if-true.instruction";
import { JumpIfFalseInstruction } from "./instructions/jump-if-false.instruction";
import { LessThanInstruction } from "./instructions/less-than.instruction";
import { EqualsInstruction } from "./instructions/equals.instruction";
import { BaseInstruction } from "./instructions/base.instruction";

export class Cpu {

    private instructionSet: Map<number, Instruction> = new Map()
    //private executionStack: Array<{ instruction: Instruction, options: InstructionOptions, process: Process }> = []

    public constructor(private frequenzy: number, private memory: Memory) {
        this.instructionSet.set(1, new AddInstruction())
        this.instructionSet.set(2, new MultiplyInstruction())
        this.instructionSet.set(3, new InputInstruction())
        this.instructionSet.set(4, new OutputInstruction())
        this.instructionSet.set(5, new JumpIfTrueInstruction())
        this.instructionSet.set(6, new JumpIfFalseInstruction())
        this.instructionSet.set(7, new LessThanInstruction())
        this.instructionSet.set(8, new EqualsInstruction())
        this.instructionSet.set(9, new BaseInstruction())
        this.instructionSet.set(60, new JumpInstruction())
        this.instructionSet.set(99, new ExitInstruction())
    }

    public cycle(process: Process): number {
        const instructionOptions = this.calculateInstructionOptions(this.memory.read(process, process.getInstructionPointer()))
        const instruction = this.instructionSet.get(instructionOptions.opCode)
        //this.executionStack.push({ instruction, options: instructionOptions, process: JSON.parse(JSON.stringify(process))})
        if (instruction === undefined) {
            throw new Error(`Trying to execute unknown instruction ${instructionOptions.opCode}`)
        }
        const instructionResult = instruction.execute(instructionOptions, process)
        process.setInstructionPointer(process.getInstructionPointer() + instruction.getParameterCount() + 1)
        return instructionResult
    }

    private calculateInstructionOptions(opCode: number): InstructionOptions {
        const opString = opCode.toString()
        const instructionOptions: InstructionOptions = {
            opCode: opCode % 100,
            parameterModes: []
        }
        for (let i = 2; i < opString.length; i++) {
            instructionOptions.parameterModes.push(+opString.charAt(opString.length - i - 1))
        }
        return instructionOptions
    }

    public getFrequency(): number {
        return this.frequenzy
    }
}