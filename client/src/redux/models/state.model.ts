import {User} from "../../auth/models/user.model.ts";

export interface State {
    user: User | null;
    authenticated: boolean;
}