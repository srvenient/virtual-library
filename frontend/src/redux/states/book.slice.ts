import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import apiClient from "../../shared/services/apiClient.ts";
import {BookState} from "../models/book.state.model.ts";
import {Book} from "../../book/models/book.model.ts";

export const initialState: BookState = {
  books: [],
  count: 0,
  loading: false,
  error: null
}

export const fetchBooks = createAsyncThunk<
  { data: Book[], count: number },
  { page: number, limit: number },
  { rejectValue: string }
>(
  "books/fetchBooks",
  async ({page, limit}, {rejectWithValue}) => {
    try {
      const response = await apiClient.get<{ data: Book[], count: number }>(
        `/books?page=${page}&limit=${limit}`
      );
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

export const reserveBook = createAsyncThunk<
  { message: string },
  ReservationPayload,
  { rejectValue: string }
>(
  "books/reserveBook",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<{ message: string }>(
        `/reservation/`,
        {
          resource_type: "book",
          ...payload
        }
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || "Failed to reserve book";

      if (errorMessage.toLowerCase().includes("reservation")) {
        return rejectWithValue("Ya tienes una reserva activa para este recurso.");
      } else {
        return rejectWithValue(errorMessage);
      }
    }
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchBooks
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<{ data: Book[], count: number }>) => {
        state.loading = false;
        state.books = action.payload.data;
        state.count = action.payload.count;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch books";
      });
    builder
      // reserveBook
      .addCase(reserveBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reserveBook.fulfilled, (state) => {
        state.loading = false;
        // Optionally handle successful reservation here
      })
      .addCase(reserveBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to reserve book";
      });
  }
})

export default booksSlice.reducer;