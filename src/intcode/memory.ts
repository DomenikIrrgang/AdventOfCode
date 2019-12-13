import { Process } from "./process";

export interface Memory {
    reset(process: Process): void
    read(process: Process, address: number): number 
    write(process: Process, address: number, value: number): void
    setData(process: Process, address: number, data: number[]): void
    getDefaultValue(): number
    isInRange(address: number): boolean
}