import { Process } from "./process";

export interface CpuScheduler {
    nextProcess(): Process
}