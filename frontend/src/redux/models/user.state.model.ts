import {User} from "../../auth/models/user.model.ts";

export interface UserState {
    user: User | null;
    authenticated: boolean;
}