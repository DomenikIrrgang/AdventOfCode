import { Intcode } from "./intcode";
import { Program } from "./program";

export interface Instruction {
    execute(program: Program, ... params: any): void
    getParameterCount(): number
}