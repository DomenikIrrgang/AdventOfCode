import { Program } from "../program";
import * as fs from "fs"

export class FileProgram implements Program {

    private data: number[] = []

    public constructor(private path: string) {
        const program = fs.readFileSync(path, "utf8")
        this.data = program.split(",").map((value => +value)) as unknown as number[]
    }

    public getName(): string {
        const tmp = this.path.split("/")
        return tmp[tmp.length - 1]
    }
    
    public getData(): number[] {
        return this.data
    }

}