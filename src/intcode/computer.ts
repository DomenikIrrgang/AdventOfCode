import { Program } from "./program";

export class Computer {
    
    private running: boolean
    
    public runProgram(program: Program): number {
        //console.log("Running program:", program.getName())
        this.running = true
        const exitCode = program.run(this)
        this.running = false
        //console.log("Execution of program", program.getName(), "finished with exitcode ", exitCode)
        return exitCode
    }
}