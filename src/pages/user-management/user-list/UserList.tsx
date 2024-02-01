import type { ReactElement } from "react";
import type { UserListData } from "~/api/user-management/types";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { PageLoader, Table } from "~/components";
import { EditUserModal } from "~/pages/user-management/user-management-modal/edit-user-modal";
import { ConfirmModal } from "~/components/modal/confirm-modal";
import { useDeleteUser } from "~/mutations/user-management";

import { userListColumns } from "./utils";

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

        <EditUserModal
          onEditUser={(): void => {}}
          currentUser={currentUserData}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />

        <ConfirmModal
          onConfirmWithIndex={(): void => {
            DeleteUser.mutate(
              { id: currentUser },
              {
                onSuccess: () => {
                  setDeleteModalOpen(false);
                  refetch();
                },
                onError: (error) => {
                  console.log(error);
                },
              },
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
