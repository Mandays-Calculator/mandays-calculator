import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse } from "~/api/auth";
import type { UserPermissionState } from "./types";
import type { GenericErrorResponse } from "~/api/types";

import { createSlice } from "@reduxjs/toolkit";
import { decryptObjectWithAES } from "~/utils/cryptoUtils";
import { getEnvConfig } from "~/utils/env-config";

import { login, logout } from "./actions";
import { getUserToken } from "~/hooks/user";
import { removeCookie } from "~/utils/cookieUtils";
import { cookieAuthKey } from "~/utils/constants";
import { removeStateStorage } from "~/utils/helpers";

/**
 * User state for Authentication and User
 */
const initialState: UserPermissionState = {
  // Auth
  isAuthenticated: false,
  error: null,
  tokenExpiry: null,
  loading: false,
  // User
  user: null,
  permissions: [],
  isLogoutError: false,
  projects: [],
  selectedProject: { label: "", value: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      return { ...state, loading: true, isLogoutError: false };
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        const { user, permissions, projects } = action.payload;
        state.loading = false;
        state.user = user;
        state.permissions = permissions;
        state.tokenExpiry = action.payload.token.expiresInMs;
        state.isAuthenticated = true;
        state.selectedProject =
          projects.length > 0
            ? { label: projects[0].name, value: projects[0].projectId }
            : { label: "", value: "" };
        return state;
      },
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.permissions = [];
      state.tokenExpiry = null;
      state.isAuthenticated = false;
      state.error = action.payload as GenericErrorResponse;
      return state;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      return state;
    });
    builder.addCase(logout.fulfilled, () => {
      return initialState;
    });
    builder.addCase(logout.rejected, () => {
      return {
        ...initialState,
        isLogoutError: true,
      };
    });
    // Adding success and failed callback
    builder.addMatcher(
      (action) => action.type.startsWith("auth/login/"),
      (_, action) => {
        const { onSuccess, onFailure } = action.meta.arg;
        if (action.type.endsWith("fulfilled")) {
          onSuccess?.(action.payload);
        } else if (action.type.endsWith("rejected")) {
          onFailure?.(action.error);
        }
      },
    );
    builder.addMatcher(
      (action) => action.type.startsWith("auth/logout/"),
      (_, action) => {
        const { onSuccess, onFailure } = action.meta.arg;
        if (action.type.endsWith("fulfilled")) {
          onSuccess?.(action.payload);
          removeStateStorage("session");
          removeCookie(cookieAuthKey);
        } else if (action.type.endsWith("rejected")) {
          onFailure?.(action.error);
          removeStateStorage("session");
          removeCookie(cookieAuthKey);
        }
      },
    );
  },
  reducers: {
    updateUserState: (
      state: UserPermissionState,
      action: PayloadAction<LoginResponse>,
    ) => {
      const config = getEnvConfig();
      const { user, permissions, projects } = action.payload;
      const decryptedUserData = decryptObjectWithAES(user, !config.encryptData);
      const decryptedPermissionsData = decryptObjectWithAES(
        permissions,
        !config.encryptData,
      );
      const decryptedProjectsData = decryptObjectWithAES(
        projects,
        !config.encryptData,
      );

      const cookieItem = getUserToken();

      state.loading = false;
      state.user = decryptedUserData;
      state.permissions = decryptedPermissionsData;
      state.projects = decryptedProjectsData;
      state.tokenExpiry = cookieItem.expiresInMs;
      state.isAuthenticated = true;
      state.selectedProject =
        decryptedProjectsData.length > 0
          ? {
              label: decryptedProjectsData[0].name,
              value: decryptedProjectsData[0].projectId,
            }
          : { label: "", value: "" };
      return state;
    },
    updateSelectedProject: (
      state: UserPermissionState,
      action: PayloadAction<SelectObject | null>,
    ) => {
      state.selectedProject = action.payload;
      return state;
    },
  },
});

export const { updateUserState, updateSelectedProject } = userSlice.actions;
export default userSlice.reducer;
