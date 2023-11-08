import type { UserListResponse } from "~/api/user-management";
import { useQuery } from "react-query";
import { getUserList } from "~/api/user-management/UserManagement";

export const useUserList = () => {
  return useQuery<UserListResponse, Error>("userList", getUserList);
};
