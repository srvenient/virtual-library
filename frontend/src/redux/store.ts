import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./states/auth.slice.ts";

export interface AppStore {
    auth: any;
}

export const store = configureStore<AppStore>({
    reducer: {
        auth: authSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
