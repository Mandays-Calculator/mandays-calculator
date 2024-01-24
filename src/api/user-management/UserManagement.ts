import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import {
  UserListResponse,
  AddUserParams,
  AddUserResponse,
  DeleteUserResponse,
  DeleteUserParam,
  GetUsersParam,
} from ".";

export const getUserList = async (
  params: GetUsersParam | undefined
): Promise<UserListResponse> => {
  const hasParam = params && Object.keys(params).length > 0;
  const { apiBasePath } = getEnvConfig();

  // If params exist, build the URL with query parameters
  const apiUrl = hasParam
    ? `${apiBasePath}/users?${new URLSearchParams(params as string).toString()}`
    : `${apiBasePath}/users`;

  const res = await axios.get<UserListResponse>(apiUrl);
  return res.data;
};

export const AddUser = async (
  params: AddUserParams
): Promise<AddUserResponse> => {
  const { apiBasePath } = getEnvConfig();
  try {
    const res = await axios.post<AddUserResponse>(`${apiBasePath}/users`, {
      ...params,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const EditUser = async (
  params: AddUserParams,
  id: string
): Promise<AddUserResponse> => {
  const { apiBasePath } = getEnvConfig();
  const res = await axios.put<AddUserResponse>(`${apiBasePath}/users/${id}`, {
    ...params,
  });
  return res;
};
export const DeleteUser = async (
  param: DeleteUserParam
): Promise<DeleteUserResponse> => {
  const { apiBasePath } = getEnvConfig();
  const res = await axios.delete<DeleteUserResponse>(
    `${apiBasePath}/users/${param.id}`
  );
  return res.data;
};
