import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import apiClient from "../../shared/services/apiClient.ts";
import {Computer} from "../../computer/models/computer.model.ts";
import {ComputerState} from "../models/computer.state.model.ts";

export const initialState: ComputerState = {
  computers: [],
  count: 0,
  loading: false,
  error: null
}

export const fetchComputers = createAsyncThunk<
  { data: Computer[], count: number },
  { page: number, limit: number },
  { rejectValue: string }
>(
  "computers/fetchComputers",
  async ({page, limit}, {rejectWithValue}) => {
    try {
      const response = await apiClient.get<{ data: Computer[], count: number }>(
        `/computers?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const computersSlice = createSlice({
  name: "computers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchBooks
      .addCase(fetchComputers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComputers.fulfilled, (state, action: PayloadAction<{ data: Computer[], count: number }>) => {
        state.loading = false;
        state.computers = action.payload.data;
        state.count = action.payload.count;
      })
      .addCase(fetchComputers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch computers";
      });
  }
})

export default computersSlice.reducer;