import {Computer} from "../../computer/models/computer.model.ts";

export interface ComputerState {
    computers: Computer[];
    count: number;
    loading: boolean;
    error: string | null;
}
