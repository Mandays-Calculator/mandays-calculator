import { useQuery } from "react-query";

import { getUserList } from "~/api/user-management/UserManagement";

export const useUserList = () => {
  return useQuery("userlist", () => getUserList());
};
