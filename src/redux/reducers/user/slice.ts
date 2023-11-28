import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserPermissionResponse } from "~/api/user";

import { createSlice } from "@reduxjs/toolkit";
import { fetchUserPermission } from "./actions";

import { UserPermissionState } from "./types";

const initialState: UserPermissionState = {
  user: null,
  loading: false,
  permissions: [],
  initialized: false,
};

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
        const { user, permissions } = action.payload;
        state.user = user;
        state.permissions = permissions;
        state.initialized = true;
      }
    );
    builder.addCase(fetchUserPermission.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.permissions = [];
      state.initialized = true;
    });
    // Adding success and failed callback
    builder.addMatcher(
      (action) => action.type.startsWith("user/fetchUserPermission/"),
      (_, action) => {
        const { onSuccess, onFailure } = action.meta.arg;
        if (action.type.endsWith("fulfilled")) {
          onSuccess?.(action.payload);
        } else if (action.type.endsWith("rejected")) {
          onFailure?.(action.error);
        }
      }
    );
  },
  reducers: {
    resetUserState: () => {
      return initialState;
    },
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
