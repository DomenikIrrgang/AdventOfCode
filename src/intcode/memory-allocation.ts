import { Process } from "./process";

export interface MemoryAllocation {
    process: Process
    startAddress: number
    endAddress: number
}