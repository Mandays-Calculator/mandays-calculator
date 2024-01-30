import type {
  AuthAPIResponse,
  ResetPasswordParams,
  LoginResponse,
  Token,
} from "./types";

import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";

const getApiBasePath = () => {
  const { apiBasePath } = getEnvConfig();
  return apiBasePath;
};

export const forgotPasswordApi = async (
  usernameOrEmail: string,
): Promise<AuthAPIResponse> => {
  const url = `${getApiBasePath()}/forgot-password?username=${usernameOrEmail}`;
  try {
    const response = await axios.post<AuthAPIResponse>(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordApi = async (
  params: ResetPasswordParams,
): Promise<AuthAPIResponse> => {
  const { apiBasePath } = getEnvConfig();
  try {
    const response = await axios.post(`${apiBasePath}/reset-password`, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const loginApi = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  const { apiBasePath } = getEnvConfig();
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  try {
    const response = await axios.post(`${apiBasePath}/login`, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const logoutApi = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): Promise<LoginResponse> => {
  const { apiBasePath } = getEnvConfig();

  try {
    const response = await axios.post(`${apiBasePath}/logout`, {
      token: accessToken,
      refreshToken: refreshToken,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshTokenApi = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<{ token: Token }> => {
  const { apiBasePath } = getEnvConfig();

  try {
    const response = await axios.post(
      `${apiBasePath}/refresh-token`,
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          Authorization: "No Auth",
        },
      },
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
