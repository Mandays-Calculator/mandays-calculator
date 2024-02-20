import type { AsyncActionCallbacks } from "~/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi } from "~/api/auth";
import { setItemStorage } from "~/utils/helpers";
import { encryptObjectWithAES } from "~/utils/cryptoUtils";
import { getEnvConfig } from "~/utils/env-config";
import { SESSION_STORAGE_ITEMS, cookieAuthKey } from "~/utils/constants";
import { setCookie } from "~/utils/cookieUtils";
import { getUserToken } from "~/hooks/user";

interface LoginParams {
  username: string;
  password: string;
  callbacks?: AsyncActionCallbacks;
}

interface LogoutParams {
  callbacks?: AsyncActionCallbacks;
}

/**
 * Asynchronous action creator for user login.
 * This thunk will perform a login operation using the provided username and password.
 * On successful login, it will save the user data and token to session storage.
 */
export const login = createAsyncThunk(
  "auth/login",
  async (args: LoginParams, thunkAPI) => {
    const config = getEnvConfig();

    try {
      const response = await loginApi({
        username: args.username,
        password: args.password,
      });

      // Invoke onSuccess callback if provided
      if (args.callbacks?.onSuccess) args.callbacks.onSuccess();

      // Save user properties to session storage
      setItemStorage(
        SESSION_STORAGE_ITEMS.mcUser,
        {
          permissions: encryptObjectWithAES(
            response.permissions,
            !config.encryptData,
          ),

          user: encryptObjectWithAES(response.user, !config.encryptData),
          projects: encryptObjectWithAES(
            response.projects,
            !config.encryptData,
          ),
        },
        "local",
      );

      // Save token properties to cookie storage
      setCookie(cookieAuthKey, response.token);
      return response;
    } catch (error) {
      if (args.callbacks?.onFailure) args.callbacks.onFailure();
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (args: LogoutParams, thunkAPI) => {
    const token = getUserToken();
    try {
      const response = await logoutApi({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });

      if (args.callbacks?.onSuccess) args.callbacks.onSuccess();
      return response;
    } catch (error) {
      if (args.callbacks?.onFailure) args.callbacks.onFailure();
      return thunkAPI.rejectWithValue(error);
    }
  },
);
