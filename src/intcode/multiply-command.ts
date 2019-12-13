import { Instruction } from "./instruction";
import { Program } from "./program";

export class MultiplyInstruction implements Instruction {

    public execute(program: Program, input1: number, input2: number, output: number): void {
        program.writeMemory(output, program.readMemory(input1) * program.readMemory(input2))
    }

    public getParameterCount(): number {
        return 3
    }
    
}