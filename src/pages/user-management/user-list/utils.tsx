import type { CellProps } from "react-table";
import { IconButton } from "@mui/material";
import { SvgIcon } from "~/components";
import { UserListData } from "~/api/user-management/types";
import { UserColumnsProps, UserListColumnsType } from "./types";

export const userListColumns = ({
  t,
  onDeleteUser,
  onEditUser,
}: UserColumnsProps): UserListColumnsType[] => {
  return [
    {
      Header: t("Name"),
      Cell: ({ row }: CellProps<UserListData>) => {
        return (
          row.original.firstName +
          " " +
          (row.original.middleName ? row.original.middleName + " " : "") +
          row.original.lastName
        );
      },
    },
    {
      accessor: "email",
      Header: t("Email"),
    },
    {
      accessor: "joiningDate",
      Header: "Joining Date",
    },
    {
      accessor: "roles",
      Header: t("Roles"),
      Cell: ({ row }: CellProps<UserListData>) => {
        return row.original.roles.join(", ");
      },
    },
    {
      Header: t("Action"),
      Cell: ({ row }: CellProps<UserListData>) => (
        <>
          <IconButton onClick={() => onEditUser(row.original.id)}>
            <SvgIcon name="edit" $size={2} color="primary" />
          </IconButton>
          <IconButton onClick={() => onDeleteUser(row.original.id, row.index)}>
            <SvgIcon name="delete" $size={2} color="error" />
          </IconButton>
        </>
      ),
    },
  ];
};
