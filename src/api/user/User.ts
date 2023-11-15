import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { UserPermissionResponse } from ".";

export const getUserPermission = async (): Promise<UserPermissionResponse> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<UserPermissionResponse>(
    `${apiBasePath}/user/permissions`
  );
  return response.data;
};
