import type {
  UserListResponse,
  AddUserResponse,
  AddUserParams,
} from "~/api/user-management";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

import { AddUser, getUserList } from "~/api/user-management/UserManagement";

export const useUserList = () => {
  return useQuery<UserListResponse, Error>("userList", getUserList);
};

export const useAddUser = () => {
  return useMutation<AddUserResponse, AxiosError, AddUserParams>(
    "addUser",
    (params) => AddUser(params)
  );
};
