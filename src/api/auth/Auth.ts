import type { ForgotPasswordResponse } from "./types";

import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";

const getApiBasePath = () => {
  const { apiBasePath } = getEnvConfig();
  return apiBasePath;
};

export const forgotPasswordApi = async (
  usernameOrEmail: string
): Promise<ForgotPasswordResponse> => {
  const url = `${getApiBasePath()}/forgot-password?username=${usernameOrEmail}`;
  try {
    const response = await axios.post<ForgotPasswordResponse>(url);
    if (response.data && response.data.status >= 201) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
