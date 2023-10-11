import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { LoginState, LoginParamRequest, LoginParamResponse } from "./types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: LoginState = {
  isLoggedIn: false,
  loading: true,
  token: "",
};

export const loginUser = createAsyncThunk("login/loginUser", () => {
  // will replace by axios api integration
  const res = fetch("/").then((data) => data.json());
  return res;
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<LoginParamResponse>) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
      }
    );
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.token = "";
    });
  },
  reducers: {
    login: (state, action: PayloadAction<LoginParamRequest>) => {
      console.log("password", action.payload.password);
      state.isLoggedIn = true;
    },
  },
});

export const { login } = loginSlice.actions;
export const selectCount = (state: RootState) => state.login.isLoggedIn;
export default loginSlice.reducer;
