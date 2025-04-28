import {Room} from "../../room/models/room.model.ts";

export interface RoomState {
    rooms: Room[];
    count: number;
    loading: boolean;
    error: string | null;
}
