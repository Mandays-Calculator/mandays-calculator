import { type ReactElement } from "react";
import { CustomButton } from "~/components/form/button";
import Modal from "~/components/modal/Modal";
import { Box } from "@mui/material";
import { SvgIcon } from "~/components";
import { useDeleteUser } from "~/queries/user-management/UserManagement";

interface DeleteUserModal {
  open: boolean;
  onClose: () => void;
  message?: string;
  id: string;
}

export const DeleteUserModal: React.FC<DeleteUserModal> = ({
  open,
  onClose,
  id,
}): ReactElement => {
  const DeleteUser = useDeleteUser();
  return (
    <Modal open={open} title="" maxWidth="xs" onClose={onClose}>
      <>
        <SvgIcon name="delete" $size={2} color="error" />

        <Box display="flex" justifyContent="flex-end" my={2}>
          <CustomButton
            variant="contained"
            colorVariant="neutral"
            onClick={onClose}
            style={{ marginRight: 16 }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            variant="contained"
            color="primary"
            onClick={() => {
              DeleteUser.mutate(
                { id },
                {
                  onSuccess: (data) => {
                    console.log("success", data);
                  },
                  onError: (error) => {
                    console.log(error);
                  },
                }
              );
            }}
          >
            Save
          </CustomButton>
        </Box>
      </>
    </Modal>
  );
};

export default DeleteUserModal;
