import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    name: string | null;
    username: string | null;
    email: string | null;
    [key: string]: unknown;
  };
  token: string | null;
  mode: "light" | "dark";
}

const initialState: AuthState = {
  user: {
    _id: null,
    name: null,
    username: null,
    email: null,
  },
  token: null,
  mode: "light",
};

export interface UserState {
  user: {
    name: string | null;
    username: string | null;
    email: string | null;
  };
  token: string | null;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      localStorage.removeItem("state");
      state.user = {
        _id: null,
        name: null,
        username: null,
        email: null,
      };
      state.token = null;
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setLogin, setLogout, setMode } = authSlice.actions;

export default authSlice.reducer;
