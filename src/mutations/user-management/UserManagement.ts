import type {
  AddUserResponse,
  AddUserParams,
  DeleteUserParam,
  DeleteUserResponse,
} from "~/api/user-management";

import {
  AddUser,
  EditUser,
  DeleteUser,
} from "~/api/user-management/UserManagement";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

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

export const useDeleteUser = () => {
  return useMutation<DeleteUserResponse, AxiosError, DeleteUserParam>(
    "deleteUser",
    (params) => DeleteUser(params)
  );
};
