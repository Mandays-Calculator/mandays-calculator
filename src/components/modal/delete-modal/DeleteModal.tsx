import type { ReactElement } from "react";

import { t } from "i18next";
import { CustomButton } from "~/components/form/button";
import { Modal, SvgIcon } from "~/components";
import { Box, Stack } from "@mui/material";

interface DeleteModalProps {
  onDeleteConfirm?: (rowIndex: number) => void;
  onConfirm?: () => void;
  open: boolean;
  onClose: () => void;
  message?: string;
  selectedRow: number | null;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  onDeleteConfirm,
  open,
  onClose,
  message = "",
  selectedRow,
  onConfirm,
}): ReactElement => {
  return (
    <Modal open={open} title="" maxWidth="xs" onClose={onClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <SvgIcon name="warning" $size={7} />
        <Box maxWidth={250} textAlign="center">
          {message || t("odc.modal.deleteLabel")}
        </Box>
      </Stack>

      <Box display="flex" justifyContent="center" my={2}>
        <CustomButton
          variant="contained"
          colorVariant="neutral"
          onClick={onClose}
          style={{ marginRight: 16 }}
        >
          {t("odc.modal.yesPleaseBtn")}
        </CustomButton>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={() => {
            if (selectedRow !== null && onDeleteConfirm) {
              onDeleteConfirm(selectedRow);
            }
            if (onConfirm) {
              onConfirm();
            }
          }}
        >
          {t("odc.modal.noThanksBtn")}
        </CustomButton>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
