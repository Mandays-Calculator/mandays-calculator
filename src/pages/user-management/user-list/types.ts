import type { TFunction } from "i18next";
import { Column } from "react-table";
import { UserListData } from "~/api/user-management/types";

export type UserColumnsProps = {
  t: TFunction<"translation", undefined>;
  onEditUser: (currentUserData: UserListData) => void;
  onDeleteUser: (userId: string, rowId: number) => void;
};

export type UserListColumnsType = Column<UserListData>;

export type DataType = {
  name: string;
  email: string;
  roles: string;
  date: string;
};
