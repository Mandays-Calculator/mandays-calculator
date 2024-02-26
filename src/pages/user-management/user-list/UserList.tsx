import type { ReactElement } from "react";
import type { UserListData } from "~/api/user-management/types";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Alert, PageLoader, Table } from "~/components";
import { EditUserModal } from "~/pages/user-management/user-management-modal/edit-user-modal";
import { ConfirmModal } from "~/components/modal/confirm-modal";
import { useDeleteUser } from "~/mutations/user-management";

import { userListColumns } from "./utils";
import LocalizationKey from "~/i18n/key";

interface UserListProps {
  userListData?: UserListData[];
  isSuccessAddUser?: boolean;
  isLoading?: boolean;
  refetch: () => void;
}

const UserList = ({
  userListData,
  isSuccessAddUser,
  refetch,
  isLoading,
}: UserListProps): ReactElement => {
  const { t } = useTranslation();
  const DeleteUser = useDeleteUser();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [successDelete, setSuccessDelete] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [rowId, setRowId] = useState<number>(0);

  const { userManagement } = LocalizationKey;

  const handleEditUser = (userId: string): void => {
    setEditModalOpen(true);
    setCurrentUser(userId);
  };

  const handleDeleteUser = (userId: string, rowId: number): void => {
    setDeleteModalOpen(true);
    setCurrentUser(userId);
    setRowId(rowId);
  };

  useEffect(() => {
    refetch();
  }, [isSuccessAddUser]);

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
          data={userListData}
        />

        {editModalOpen && (
          <EditUserModal
            onEditUser={(): void => {}}
            userId={currentUser}
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
          />
        )}

        <ConfirmModal
          onConfirmWithIndex={(): void => {
            DeleteUser.mutate(
              { id: currentUser },
              {
                onSuccess: () => {
                  setDeleteModalOpen(false);
                  setSuccessDelete(true);
                  refetch();
                },
              },
            );
          }}
          message={t(userManagement.confirmMessage.deleteUser)}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          selectedRow={rowId}
        />
        {successDelete && (
          <Alert
            type="success"
            open={true}
            duration={3000}
            message={t(userManagement.successMessage.deleteUser)}
          />
        )}
      </>
    );
  }
};

export default UserList;
