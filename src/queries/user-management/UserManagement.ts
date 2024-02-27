import type {
  UserListResponse,
  GetUserByIdResponse,
} from "~/api/user-management";
import { useQuery } from "react-query";

import { getUserList, getUserById } from "~/api/user-management/UserManagement";
import { GetUsersParam } from "~/api/user-management/types";

export const useUserList = (params?: GetUsersParam) => {
  return useQuery<UserListResponse, Error>(["userList", params], () =>
    getUserList(params),
  );
};

export const useUserByID = (id: string) => {
  return useQuery<GetUserByIdResponse, Error>(["useUserByID"], () =>
    getUserById(id),
  );
};
