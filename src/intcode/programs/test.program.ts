import { Program } from "../program";

export class TestProgramm implements Program {

    public getName(): string {
        return "test.int"
    }

    public getData(): number[] {
        return [109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99]
    }

}