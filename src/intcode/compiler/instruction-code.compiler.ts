import { Compiler } from "./compiler";
import { CompilerOptions } from "./compiler-options";
import { Program } from "../program";
import { ArrayProgram } from "../programs/array.program";
import * as fs from "fs"

export class InstructionCodeCompiler implements Compiler {

    public compile(path: string, compilerOptions?: CompilerOptions): Program {
        const program = []
        const lines = fs.readFileSync(path).toString().split("\n")
        for (let line in lines) {
            console.log(line)
        }
        return new ArrayProgram(path.split("/").pop(), [])
    }

}