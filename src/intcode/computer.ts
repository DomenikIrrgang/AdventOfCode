import { Program } from "./program";
import { SystemMemory } from "./system-memory";
import { Process } from "./process";
import { Cpu } from "./cpu";
import { Idle } from "./programs/idle.program";
import { InstructionResult } from "./instruction-result";

export class Computer {
    
    private memory: SystemMemory
    private rootProcess: Process
    private processes: Process[]
    private cpu: Cpu

    public constructor() {}

    public start(): void {
        this.memory = new SystemMemory(0, 1024, 0)
        this.cpu = new Cpu(1000, this.memory)
        this.processes = []
        this.rootProcess = this.loadProgram(new Idle())
        setInterval(this.cpuTick.bind(this), this.cpu.getFrequency())
    }

    private cpuTick(): void {
        const instructionResult = this.cpu.cycle(this.processes[this.processes.length - 1])
        if (instructionResult !== InstructionResult.OK) {
            this.stopProcess(this.processes[this.processes.length - 1], instructionResult)
        }
    }

    public loadProgram(program: Program): Process {
        const process = new Process(this.processes.length, program.getName(), program, this.memory)
        this.processes.push(process)
        const processMemory = this.memory.allocate(process, program.getData().length)
        process.setMemoryAllocation(processMemory)
        process.setInstructionPointer(processMemory.startAddress)
        this.memory.setData(process, processMemory.startAddress, program.getData())
        return process
    }

    public stopProcess(process: Process, exitCode: number): void {
        this.memory.free(process, process.getMemoryAllocation())
        this.processes.splice(this.processes.findIndex(value => value.getId() === process.getId()), 1)
        console.log(`Process "${process.getName()} (${process.getId()}) exited with code ${exitCode}.`)
    }
    
}