import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./states/auth.slice.ts";
import {booksSlice} from "./states/book.slice.ts";

export interface AppStore {
    auth: any;
    books: any;
}

export const store = configureStore<AppStore>({
    reducer: {
        auth: authSlice.reducer,
        books: booksSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
