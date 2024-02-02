import type { UserListResponse } from "~/api/user-management";
import { useQuery } from "react-query";

import { getUserList } from "~/api/user-management/UserManagement";
import { GetUsersParam } from "~/api/user-management/types";

export const useUserList = (params?: GetUsersParam) => {
  return useQuery<UserListResponse, Error>(["userList", params], () =>
    getUserList(params),
  );
};
