import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { UserListResponse } from ".";

export const getUserList = async (): Promise<UserListResponse> => {
  const { apiBasePath } = getEnvConfig();
  const res = await axios.get<UserListResponse>(`${apiBasePath}/users`);
  return res.data;
};
