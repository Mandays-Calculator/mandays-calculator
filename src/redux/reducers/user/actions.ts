import type { AsyncActionCallbacks } from "~/redux/store";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserPermission } from "~/api/user";

export const fetchUserPermission = createAsyncThunk(
  "user/fetchUserPermission",
  async (args: AsyncActionCallbacks, thunkAPI) => {
    try {
      const response = await getUserPermission();
      if (args.onSuccess) args.onSuccess();
      return response;
    } catch (error) {
      if (args.onFailure) args.onFailure();
      return thunkAPI.rejectWithValue(error);
    }
  }
);
