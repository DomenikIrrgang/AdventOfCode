import { Program } from "../program";

export class Idle implements Program {

    public getName(): string {
        return "idle.int"
    }
    
    public getData(): number[] {
        return [60, 0]
    }

}