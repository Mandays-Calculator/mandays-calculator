import type { ReactElement } from "react";
import { CustomButton } from "~/components/form/button";
import Modal from "~/components/modal/Modal";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, Stack } from "@mui/material";

interface DeleteModalProps {
  onDeleteConfirm: () => void;
  open: boolean;
  onClose: () => void;
  message?: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  onDeleteConfirm,
  open,
  onClose,
  message = "Are you sure you want to delete this ODC?",
}): ReactElement => {
  return (
    <Modal open={open} title="" maxWidth="xs" onClose={onClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <WarningIcon color="error" style={{ fontSize: 40 }} />
        <Box maxWidth={250} textAlign="center">
          {message}
        </Box>
      </Stack>

      <Box display="flex" justifyContent="center" my={2}>
        <CustomButton
          variant="contained"
          colorVariant="neutral"
          onClick={onClose}
          style={{ marginRight: 16 }}
        >
          No, Thanks
        </CustomButton>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={onDeleteConfirm}
        >
          Yes, Please
        </CustomButton>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
