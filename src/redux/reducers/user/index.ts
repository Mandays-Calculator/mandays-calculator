import type { PayloadAction } from "@reduxjs/toolkit";
import { UserPermissionResponse } from "~/api/user";
import type { RootState } from "../../store";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserPermission } from "~/api/user";

import { UserPermissionState } from "./types";
import { ERROR_MESSAGES } from "~/utils/constants/constants";

const initialState: UserPermissionState = {
  user: null,
  loading: false,
  error: null,
  permissions: [],
};

export const fetchUserPermission = createAsyncThunk(
  "user/fetchUserPermission",
  getUserPermission
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserPermission.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUserPermission.fulfilled,
      (state, action: PayloadAction<UserPermissionResponse>) => {
        state.loading = false;
        const { user, permissions } = action.payload.data;
        state.user = user;
        state.permissions = permissions;
      }
    );
    builder.addCase(fetchUserPermission.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.permissions = [];
      state.error = ERROR_MESSAGES.permission;
    });
  },
  reducers: {},
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
