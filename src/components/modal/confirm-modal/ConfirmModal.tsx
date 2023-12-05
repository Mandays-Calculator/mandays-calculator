import type { ReactElement, ReactNode } from "react";
import type { SvgIconsType } from "~/components/svc-icons/types";

import { t } from "i18next";
import { CustomButton } from "~/components/form/button";
import { Modal, SvgIcon } from "~/components";
import { Box, Stack } from "@mui/material";

interface ConfirmModalProps {
  onConfirmWithIndex?: (rowIndex: number) => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  open: boolean;
  onClose: () => void;
  message?: string;
  selectedRow: number | null;
  confirmIcon?: SvgIconsType | ReactNode | string;
  closeLabel?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onConfirmWithIndex,
  selectedRow,
  onConfirm,
  confirmLabel,
  confirmIcon,
  message = "",
  open,
  onClose,
  closeLabel,
}): ReactElement => {
  return (
    <Modal open={open} title="" maxWidth="xs" onClose={onClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        {confirmIcon ? (
          typeof confirmIcon === "string" ? (
            <SvgIcon name={confirmIcon as SvgIconsType} $size={7} />
          ) : (
            confirmIcon
          )
        ) : (
          <SvgIcon name="warning" $size={7} />
        )}
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
          {closeLabel || t("odc.modal.noThanksBtn")}
        </CustomButton>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={() => {
            if (selectedRow !== null && onConfirmWithIndex) {
              onConfirmWithIndex(selectedRow);
            }
            if (onConfirm) {
              onConfirm();
            }
          }}
        >
          {confirmLabel || t("odc.modal.yesPleaseBtn")}
        </CustomButton>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
