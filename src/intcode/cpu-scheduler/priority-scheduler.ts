import { CpuScheduler } from "../cpu-scheduler";
import { Process } from "../process";

export class PriorityScheduler implements CpuScheduler {

    public constructor(private processes: Process[]) {}

    public nextProcess(): Process {
        let result: Process = this.processes[0]
        for (let process of this.processes)
            if (process.getPriority() > result.getPriority())
                result = process
        return result
    }

}