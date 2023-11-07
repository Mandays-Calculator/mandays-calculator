import type { ReactElement } from "react";

import { useMemo } from "react";

import { Table } from "~/components";

import { userListColum, userListData } from "./utils";

// import { useUserList } from "~/queries/user-management/UserManagement";

const UserList = (): ReactElement => {
  const listData = useMemo(() => userListData(), []);
  return <Table name="user-list" columns={userListColum} data={listData} />;
};

export default UserList;
