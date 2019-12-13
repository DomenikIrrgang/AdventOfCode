import { Process } from "./process";
import { Memory } from "./memory";

export interface Instruction {
    execute(process: Process): number
    getParameterCount(): number
}