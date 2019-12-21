import { Process } from "./process";

export interface MemoryAllocation {
    processId: number
    startAddress: number
    endAddress: number
}