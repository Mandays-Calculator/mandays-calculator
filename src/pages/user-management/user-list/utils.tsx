import type { CellProps } from "react-table";
import React from "react";
import { Chip, IconButton } from "@mui/material";
import { SvgIcon } from "~/components";
import { UserListData } from "~/api/user-management/types";
import { UserColumnsProps, UserListColumnsType } from "./types";
import moment from "moment";
import renderRole from "~/utils/helpers/renderRoleHelper";

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
      Cell: ({ row }: CellProps<UserListData>) => {
        return moment(row.original.joiningDate).format("MM-DD-YYYY");
      },
    },
    {
      accessor: "roles",
      Header: t("Roles"),
      Cell: ({ row }: CellProps<UserListData>) => {
        return (
          <>
            {row.original.roles.map((data, index) => {
              return (
                <React.Fragment key={index}>
                  <Chip label={renderRole(data)} variant="outlined" />
                  &nbsp;
                </React.Fragment>
              );
            })}
          </>
        );
      },
    },
    {
      Header: t("Action"),
      Cell: ({ row }: CellProps<UserListData>) => {
        return (
          <>
            <IconButton
              onClick={() => {
                onEditUser(row.original.id);
              }}
              data-testid="test-edit-user-btn"
            >
              <SvgIcon name="edit" $size={2} color="primary" />
            </IconButton>
            <IconButton
              onClick={() => onDeleteUser(row.original.id, row.index)}
              data-testid="test-delete-user-btn"
            >
              <SvgIcon name="delete" $size={2} color="error" />
            </IconButton>
          </>
        );
      },
    },
  ];
};
