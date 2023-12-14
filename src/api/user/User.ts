import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { User } from ".";

type BaseResponse<T> = Promise<{ data: T; status: number }>;

export const getUsers = async (): BaseResponse<User[]> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<BaseResponse<User[]>>(
    `${apiBasePath}/users`
  );
  return response.data;
};
