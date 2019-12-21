import { Program } from "../program";

export class ArrayProgram implements Program {

    public constructor(private name: string, private memory: number[]) {}

    public getName(): string {
        return this.name
    }

    public getData(): number[] {
        return this.memory
    }

}