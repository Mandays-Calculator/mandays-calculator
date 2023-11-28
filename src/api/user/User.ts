import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { User, UserPermissionResponse } from ".";

type BaseResponse<T> = Promise<{ data: T; status: number }>;

export const getUserPermission = async (): Promise<UserPermissionResponse> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<BaseResponse<UserPermissionResponse>>(
    `${apiBasePath}/user/permissions`
  );
  return (await response.data).data;
};

export const getUsers = async (): BaseResponse<User[]> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<BaseResponse<User[]>>(
    `${apiBasePath}/users`
  );
  return response.data;
};
