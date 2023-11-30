import type { AuthAPIResponse, ResetPasswordParams } from "./types";

import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";

const getApiBasePath = () => {
  const { apiBasePath } = getEnvConfig();
  return apiBasePath;
};

export const forgotPasswordApi = async (
  usernameOrEmail: string
): Promise<AuthAPIResponse> => {
  const url = `${getApiBasePath()}/forgot-password?username=${usernameOrEmail}`;
  try {
    const response = await axios.post<AuthAPIResponse>(url);
    if (response.data && response.data.status >= 201) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordApi = async (
  params: ResetPasswordParams
): Promise<AuthAPIResponse> => {
  const url = `${getApiBasePath()}/reset-password`;
  try {
    const response = await axios.post<AuthAPIResponse>(url, {
      authorizationCode: params.authorizationCode,
      newPassword: params.newPassword,
    });
    if (response.data && response.data.status >= 201) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
