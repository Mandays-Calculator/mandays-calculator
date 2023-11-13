import type {
  UserListResponse,
  AddUserResponse,
  AddUserParams,
} from "~/api/user-management";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

import {
  AddUser,
  EditUser,
  getUserList,
} from "~/api/user-management/UserManagement";

export const useUserList = () => {
  return useQuery<UserListResponse, Error>("userList", getUserList);
};

export const useAddUser = () => {
  return useMutation<AddUserResponse, AxiosError, AddUserParams>(
    "addUser",
    (params) => AddUser(params)
  );
};

export const useEditUser = (id: string) => {
  return useMutation<AddUserResponse, AxiosError, AddUserParams>(
    "EditUser",
    (params) => EditUser(params, id)
  );
};
