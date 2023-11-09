import type {
  UserListResponse,
  AddUserResponse,
  AddUserParams,
  DeleteUserParam,
  DeleteUserResponse,
} from "~/api/user-management";

import {
  AddUser,
  getUserList,
  DeleteUser,
} from "~/api/user-management/UserManagement";
import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";

export const useUserList = () => {
  return useQuery<UserListResponse, Error>("userList", getUserList);
};

export const useAddUser = () => {
  return useMutation<AddUserResponse, AxiosError, AddUserParams>(
    "addUser",
    (params) => AddUser(params)
  );
};

export const useDeleteUser = () => {
  return useMutation<DeleteUserResponse, AxiosError, DeleteUserParam>(
    "deleteUser",
    (params) => DeleteUser(params)
  );
};
