import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import apiClient from "../../shared/services/apiClient.ts";
import {RoomState} from "../models/room.state.model.ts";
import {Room} from "../../room/models/room.model.ts";

export const initialState: RoomState = {
  rooms: [],
  count: 0,
  loading: false,
  error: null
}

export const fetchRooms = createAsyncThunk<
  { data: Room[], count: number },
  { page: number, limit: number },
  { rejectValue: string }
>(
  "rooms/fetchRooms",
  async ({page, limit}, {rejectWithValue}) => {
    try {
      const [response] = await Promise.all([apiClient.get<{ data: Room[], count: number }>(
        `/rooms?page=${page}&limit=${limit}`
      )]);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export interface ReservationPayload {
  resource_id: number;
  start_date: string;
  start_time: string;
  return_date: string;
  return_time: string;
}

export const reserveRoom = createAsyncThunk<
  { message: string },
  ReservationPayload,
  { rejectValue: string }
>(
  "rooms/reserveRoom",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<{ message: string }>(
        `/reservation/`,
        {
          resource_type: "room",
          ...payload
        }
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || "Failed to reserve room";

      if (errorMessage.toLowerCase().includes("reservation")) {
        return rejectWithValue("Ya tienes una reserva activa para este recurso.");
      } else {
        return rejectWithValue(errorMessage);
      }
    }
  }
);

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchRooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<{ data: Room[], count: number }>) => {
        state.loading = false;
        state.rooms = action.payload.data;
        state.count = action.payload.count;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch rooms";
      });
    builder
      // reserveRoom
      .addCase(reserveRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reserveRoom.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(reserveRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to reserve room";
      });
  }
})

export default roomsSlice.reducer;