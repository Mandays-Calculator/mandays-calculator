import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

import { AddUser, getUserList } from "~/api/user-management/UserManagement";
import { AddUserParams, AddUserResponse } from "~/api/user-management/types";

export const useUserList = () => {
  return useQuery("userlist", () => getUserList());
};

export const useAddUser = () => {
  return useMutation<AddUserResponse, AxiosError, AddUserParams>(
    "addUser",
    (params) => AddUser(params)
  );
};
