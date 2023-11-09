import type { ReactElement } from "react";

import { useUserList } from "~/queries/user-management/UserManagement";
import { Table } from "~/components";

import { userListColum } from "./utils";

const UserList = (): ReactElement => {
  const { data } = useUserList();
  return <Table name="user-list" columns={userListColum} data={data?.data} />;
};

export default UserList;
