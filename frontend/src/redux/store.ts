import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./states/auth.slice.ts";
import {booksSlice} from "./states/book.slice.ts";
import {computersSlice} from "./states/computer.slice.ts";
import {roomsSlice} from "./states/room.slice.ts";

export interface AppStore {
  auth: any;
  books: any;
  computers: any;
  rooms: any
}

export const store = configureStore<AppStore>({
  reducer: {
    auth: authSlice.reducer,
    books: booksSlice.reducer,
    computers: computersSlice.reducer,
    rooms: roomsSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
