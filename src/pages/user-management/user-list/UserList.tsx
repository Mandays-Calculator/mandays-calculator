import { useState, type ReactElement } from "react";

import { PageLoader, Table } from "~/components";

import { userListColumns } from "./utils";
import { EditUserModal } from "~/pages/user-management/user-management-modal/edit-user-modal";
import { useTranslation } from "react-i18next";

import {
  useDeleteUser,
  useUserList,
} from "~/queries/user-management/UserManagement";
import { DeleteModal } from "~/components/modal/delete-modal";
import { UserListData } from "~/api/user-management/types";

const UserList = (): ReactElement => {
  const { t } = useTranslation();
  const DeleteUser = useDeleteUser();
  const userList = useUserList();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [currentUserData, setCurrentUserData] = useState<UserListData>();
  const [currentUser, setCurrentUser] = useState<string>("");
  const [rowId, setRowId] = useState<number>(0);

  const handleEditUser = (currentSelectedUser: UserListData): void => {
    setEditModalOpen(true);
    setCurrentUserData(currentSelectedUser);
  };

  const handleDeleteUser = (userId: string, rowId: number): void => {
    setDeleteModalOpen(true);
    setCurrentUser(userId);
    setRowId(rowId);
  };

  if (userList.isLoading) {
    return <PageLoader />;
  } else {
    return (
      <>
        <Table
          name="user-list"
          columns={userListColumns({
            t,
            onDeleteUser: handleDeleteUser,
            onEditUser: handleEditUser,
          })}
          data={userList.data?.data}
        />

        <EditUserModal
          onEditUser={(): void => {}}
          currentUser={currentUserData}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />

        <DeleteModal
          onDeleteConfirm={(): void => {
            DeleteUser.mutate(
              { id: currentUser },
              {
                onSuccess: (data) => {
                  setDeleteModalOpen(false);
                  console.log("success", data);
                  userList.refetch();
                },
                onError: (error) => {
                  console.log(error);
                },
              }
            );
          }}
          message={t("Are you sure you want to delete this User?")}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          selectedRow={rowId}
        />
      </>
    );
  }
};

export default UserList;
