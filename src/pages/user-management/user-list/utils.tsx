import type { Column } from "react-table";
import { UserListHeader } from "./types";
import { Stack } from "@mui/material";
import { SvgIcon } from "~/components";
import { useState } from "react";
import { EditUserModal } from "~/components/modal/user-management/edit-user-modal";

export const userListColum: Column<UserListHeader>[] = [
  {
    accessor: "name",
    Header: "Name",
  },
  {
    accessor: "email",
    Header: "Email",
  },
  {
    accessor: "joiningDate",
    Header: "Joining Date",
  },
  {
    accessor: "role",
    Header: "Role",
  },
  {
    Header: "Action",
    Cell: () => {
      const [editModal, setEditModal] = useState(false);
      return (
        <Stack direction="row" spacing={2}>
          <SvgIcon
            onClick={() => {
              setEditModal(true);
            }}
            name="edit"
            color="primary"
            $size={2}
          />

          <SvgIcon name="delete" color="error" $size={2} />
          <EditUserModal
            open={editModal}
            onEditUser={() => {
              alert("success");
            }}
            onClose={() => setEditModal(false)}
          />
        </Stack>
      );
    },
  },
];

export const userListData = (): UserListHeader[] => {
  return [
    {
      name: "Juan Dela Cruz",
      email: "juandelacruz@email.com",
      joiningDate: "01/01/23",
      role: "Sprint Manager",
    },
    {
      name: "Juan Dela Cruz",
      email: "juandelacruz@email.com",
      joiningDate: "01/01/23",
      role: "Sprint Manager",
    },
    {
      name: "Juan Dela Cruz",
      email: "juandelacruz@email.com",
      joiningDate: "01/01/23",
      role: "Sprint Manager",
    },
  ];
};
