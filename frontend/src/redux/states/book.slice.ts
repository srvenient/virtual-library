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
  }
})

export default booksSlice.reducer;