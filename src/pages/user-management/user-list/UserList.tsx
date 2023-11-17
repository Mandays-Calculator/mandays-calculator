import { useState, type ReactElement } from "react";

import { useUserList } from "~/queries/user-management/UserManagement";
import { PageLoader, Table } from "~/components";

import { userListColumns } from "./utils";
import { EditUserModal } from "~/components/modal/user-management/edit-user-modal";
import { useTranslation } from "react-i18next";

import { useDeleteUser } from "~/queries/user-management/UserManagement";
import { DeleteModal } from "~/components/modal/delete-modal";

const UserList = (): ReactElement => {
  const { data, isLoading, refetch } = useUserList();
  const { t } = useTranslation();
  const DeleteUser = useDeleteUser();

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [rowId, setRowId] = useState<number>(0);

  const handleEditUser = (userId: string): void => {
    setEditModalOpen(true);
    setCurrentUser(userId);
  };

  const handleDeleteUser = (userId: string, rowId: number): void => {
    setDeleteModalOpen(true);
    setCurrentUser(userId);
    setRowId(rowId);
  };

  if (isLoading) {
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
          data={data?.data}
        />

        <EditUserModal
          onEditUser={(): void => {}}
          currentUser={currentUser}
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
                  refetch();
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
