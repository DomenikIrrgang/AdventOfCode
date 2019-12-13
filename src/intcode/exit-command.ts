import { Instruction } from "./instruction";
import { Program } from "./program";

export class ExitInstruction implements Instruction {

    public execute(program: Program): void {
        program.finish()
    }

    public getParameterCount(): number {
        return 0
    }
    
}