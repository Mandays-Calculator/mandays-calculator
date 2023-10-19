import type { Column } from "react-table";
import { UserListHeader } from "./types";
import { Stack } from "@mui/material";
import { SvgIcon } from "~/components";

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
      return (
        <Stack
          direction="row"
          spacing={2}
        >
          <SvgIcon
            name="edit"
            color="primary"
            $size={2}
          />
          <SvgIcon
            name="delete"
            color="error"
            $size={2}
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
