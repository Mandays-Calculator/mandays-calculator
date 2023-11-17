import type { CellProps, Column } from "react-table";
import { Stack } from "@mui/material";
import { SvgIcon } from "~/components";
import { useState } from "react";
import { EditUserModal } from "~/components/modal/user-management/edit-user-modal";
import { DeleteUserModal } from "~/components/modal/user-management/delete-user-modal";
import { UserListData } from "~/api/user-management/types";
import { useFormikContext } from "formik";
import { UpdateUserManagementParams } from "../types";

export const userListColum: Column<UserListData>[] = [
  {
    Header: "Name",
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
    Header: "Email",
  },
  {
    accessor: "joiningDate",
    Header: "Joining Date",
  },
  {
    accessor: "roles",
    Header: "Roles",
    Cell: ({ row }: CellProps<UserListData>) => {
      return row.original.roles.join(", ");
    },
  },
  {
    Header: "Action",
    Cell: ({ row }: CellProps<UserListData>) => {
      const [editModal, setEditModal] = useState(false);
      const [deleteModal, setDeleteModal] = useState(false);
      const [currentUser, setCurrentUser] = useState<UserListData>();
      const form = useFormikContext<UpdateUserManagementParams>();
      const setCurrentValues = {
        UpdateFirstName: row.original?.firstName ?? "",
        UpdateLastName: row.original?.lastName ?? "",
        UpdateMiddleName: row.original?.middleName ?? "",
        UpdateSuffix: row.original?.suffix ?? "",
        UpdateGender: row.original?.gender ?? "",
        UpdateEmail: row.original?.email ?? "",
        UpdateEmployeeId: row.original?.employeeId ?? "",
        UpdateOdcId: "",
        UpdateCareerStep: row.original?.careerStep ?? "",
        UpdateJoiningDate: row.original?.joiningDate ?? "",
        UpdateProjectId: "",
        UpdateTeamId: "",
        UpdateRoles: row.original?.roles ?? [],
      };

      return (
        <Stack direction="row" spacing={2}>
          <SvgIcon
            onClick={() => {
              setEditModal(true);
              setCurrentUser(row.original);
              form.setValues(setCurrentValues);
              console.log("ffff", row.original);
            }}
            name="edit"
            color="primary"
            $size={2}
          />

          <SvgIcon
            onClick={() => {
              setDeleteModal(true);
              setCurrentUser(row.original);
            }}
            name="delete"
            color="error"
            $size={2}
          />
          <EditUserModal
            open={editModal}
            currentUser={currentUser}
            onEditUser={() => setEditModal(false)}
            onClose={() => setEditModal(false)}
          />

          <DeleteUserModal
            open={deleteModal}
            id={currentUser?.id ? currentUser?.id : "0"}
            onClose={() => setDeleteModal(false)}
          />
        </Stack>
      );
    },
  },
];
