import type { ReactElement, ReactNode } from "react";
import type { SvgIconsType } from "~/components/svc-icons/types";

import { t } from "i18next";
import { CustomButton } from "~/components/form/button";
import { Modal, SvgIcon } from "~/components";
import { Box, Stack } from "@mui/material";

const maxWidthSizes = {
  sm: 200,
  md: 300,
  lg: 400,
  xl: 500,
};

interface ConfirmModalProps {
  onConfirmWithIndex?: (rowIndex: number) => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  open: boolean;
  onClose: () => void;
  message?: string;
  selectedRow?: number | null;
  confirmIcon?: SvgIconsType | ReactNode | string;
  closeLabel?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl";
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
  maxWidth = "lg",
  closeLabel,
}): ReactElement => {
  return (
    <Modal open={open} title="" maxWidth="sm" onClose={onClose}>
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

      <Box
        display="flex"
        justifyContent="center"
        my={2}
        width={maxWidth ? maxWidthSizes[maxWidth] : "auto"}
      >
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
            if (
              selectedRow !== null &&
              onConfirmWithIndex &&
              selectedRow !== undefined
            ) {
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
