import { Computer } from "../intcode/computer";
import { TestProgramm } from "../intcode/programs/test.program";
import { FileProgram } from "../intcode/programs/file.program";
import { ProcessPriority } from "../intcode/process-priority";
import { InstructionCodeCompiler } from "../intcode/compiler/instruction-code.compiler";
import { Compiler } from "../intcode/compiler/compiler";

const computer = new Computer()
const compiler = new InstructionCodeCompiler()
const program = compiler.compile("files/compiler-test/test.ic")
computer.start()
computer.loadProgram(program)
computer.run()