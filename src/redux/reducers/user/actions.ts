import type { AsyncActionCallbacks } from "~/redux/store";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "~/api/auth";
import { setItemStorage } from "~/utils/storageHelper";

interface LoginParams {
  username: string;
  password: string;
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
    try {
      const response = await loginApi({
        username: args.username,
        password: args.password,
      });

      // Invoke onSuccess callback if provided
      if (args.callbacks?.onSuccess) args.callbacks.onSuccess();

      // Save user and token properties to session storage
      setItemStorage("mc-user", response, "session");
      return response;
    } catch (error) {
      if (args.callbacks?.onFailure) args.callbacks.onFailure();
      return thunkAPI.rejectWithValue(error);
    }
  }
);
