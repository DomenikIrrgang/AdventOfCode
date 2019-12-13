import { Computer } from "./computer";

export interface Program {
    getName(): string
    run(computer: Computer): number
    finish(): void
    abort(): void
    readMemory(address: number): number
    writeMemory(address: number, value: number): void
    getMemory(): number[]
}