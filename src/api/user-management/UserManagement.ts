import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { UserListResponse } from ".";
import { AddUserParams, AddUserResponse } from "./types";

export const getUserList = async (): Promise<UserListResponse> => {
  const { apiBasePath } = getEnvConfig();
  const res = await axios.get<UserListResponse>(`${apiBasePath}/users`);
  return res.data;
};

export const AddUser = async (
  params: AddUserParams
): Promise<AddUserResponse> => {
  const { apiBasePath } = getEnvConfig();
  const res = await axios.post<AddUserResponse>(`${apiBasePath}/user`, {
    ...params,
  });
  return res;
};

export const EditUser = async (
  params: AddUserParams,
  id: string
): Promise<AddUserResponse> => {
  const { apiBasePath } = getEnvConfig();
  const res = await axios.put<AddUserResponse>(`${apiBasePath}/user/${id}`, {
    ...params,
  });
  return res;
};
