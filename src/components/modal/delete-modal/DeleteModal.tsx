import type { ReactElement } from "react";
import { CustomButton } from "~/components/form/button";
import Modal from "~/components/modal/Modal";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, Stack } from "@mui/material";

interface DeleteModalProps {
  onDeleteConfirm: (rowIndex: number) => void;
  open: boolean;
  onClose: () => void;
  message?: string;
  selectedRow: number | null;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  onDeleteConfirm,
  open,
  onClose,
  message = "Are you sure you want to delete this ODC?",
  selectedRow,
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
          onClick={() => {
            if (selectedRow !== null) {
              onDeleteConfirm(selectedRow);
            }
          }}
        >
          Yes, Please
        </CustomButton>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
