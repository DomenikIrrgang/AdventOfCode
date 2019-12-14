import { CpuScheduler } from "../cpu-scheduler";
import { Process } from "../process";

export class RandomScheduler implements CpuScheduler {

    public constructor(private processes: Process[]) {}

    public nextProcess(): Process {
        return this.processes[Math.floor(Math.random() * this.processes.length)]
    }

}