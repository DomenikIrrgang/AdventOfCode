import { Program } from "../program";

export class TestProgramm implements Program {

    public getName(): string {
        return "test.int"
    }
    
    public getData(): number[] {
        return [1, 1, 1, 1, 99]
    }

}