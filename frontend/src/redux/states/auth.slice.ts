import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiClient from "../../shared/services/apiClient.ts";
import qs from "qs";
import {UserState} from "../models/user.state.model.ts";
import Cookie from "js-cookie";
import {User} from "../../auth/models/user.model.ts";

const initialState: UserState = {
  user: null,
  authenticated: false
}

const handleError = (error: Record<string, any>, rejectWithValue: Function) => {
  return rejectWithValue(error.response?.data || "An error occurred");
};

export const register = createAsyncThunk<
  void,
  Record<string, any>,
  { rejectValue: Record<string, any> }
>(
  "auth/register",
  async (data: Record<string, any>, {rejectWithValue}) => {
    try {
      await apiClient.post("/student/create", data);
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
)

export const login = createAsyncThunk<
  void,
  Record<string, any>,
  { rejectValue: Record<string, any> }
>(
  "auth/login",
  async (data: Record<string, any>, {rejectWithValue}) => {
    try {
      await apiClient.post(
        "/login/access-token",
        qs.stringify({
          username: data.email.toLocaleLowerCase(),
          password: data.password
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
)

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: Record<string, any> }
>(
  "auth/logout",
  async (_, {rejectWithValue}) => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
)

export const fetchUser = createAsyncThunk<
  User,
  void,
  { rejectValue: Record<string, any> }
>(
  "auth/fetchUser",
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await apiClient.get("/auth/me");
      return {
        fullName: data.full_name,
        email: data.email
      };
    } catch (error: any) {
      if (error.response?.status === 401) {
        Cookie.remove("access_token");
      }
      return handleError(error, rejectWithValue);
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.authenticated = false;
      })
      .addCase(login.fulfilled, (state) => {
        state.authenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.authenticated = false;
      });
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.authenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.authenticated = false;
      });
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authenticated = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.authenticated = false;
      });
  }
});

export default authSlice.reducer;