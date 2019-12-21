import { Program } from "../program";
import { CompilerOptions } from "./compiler-options";

export interface Compiler {
    compile(path: string, compilerOptions?: CompilerOptions): Program
}