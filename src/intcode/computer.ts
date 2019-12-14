import { Program } from "./program";
import { SystemMemory } from "./system-memory";
import { Process } from "./process";
import { Cpu } from "./cpu";
import { Idle } from "./programs/idle.program";
import { InstructionResult } from "./instruction-result";
import { CpuScheduler } from "./cpu-scheduler";
import { RandomScheduler } from "./cpu-scheduler/random-scheduler";
import { ProcessPriority } from "./process-priority";
import { PriorityScheduler } from "./cpu-scheduler/priority-scheduler";

export class Computer {
    
    private memory: SystemMemory
    private rootProcess: Process
    private processes: Process[]
    private cpu: Cpu
    private cpuScheduler: CpuScheduler

    public constructor() {}

    public start(): void {
        this.memory = new SystemMemory(0, 3000000, 0)
        this.cpu = new Cpu(3, this.memory)
        this.processes = []
        this.cpuScheduler = new PriorityScheduler(this.processes)
        this.rootProcess = this.loadProgram(new Idle(), ProcessPriority.ROOT)
        setInterval(this.cpuTick.bind(this), this.cpu.getFrequency())
    }

    private cpuTick(): void {
        const process = this.cpuScheduler.nextProcess()
        const instructionResult = this.cpu.cycle(process)
        if (instructionResult !== InstructionResult.OK) {
            this.stopProcess(process, instructionResult)
        }
    }

    public loadProgram(program: Program, priority: ProcessPriority = ProcessPriority.LOW, callback: (process: Process, exitCode: number) => void = () => {}): Process {
        const process = new Process(this.processes.length, program.getName(), program, this.memory)
        this.processes.push(process)
        const processMemory = this.memory.allocate(process, program.getData().length)
        process.setMemoryAllocation(processMemory)
        process.setInstructionPointer(processMemory.startAddress)
        process.setPriority(priority)
        process.setCallback(callback)
        this.memory.setData(process, processMemory.startAddress, program.getData())
        return process
    }

    public stopProcess(process: Process, exitCode: number): void {
        process.getCallback()(process, exitCode)
        this.memory.free(process, process.getMemoryAllocation())
        this.processes.splice(this.processes.findIndex(value => value.getId() === process.getId()), 1)
        console.log(`Process "${process.getName()} (${process.getId()})" exited with code ${exitCode}.`)
    }
    
}