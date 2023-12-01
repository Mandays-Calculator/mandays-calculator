import type { ReactElement, ReactNode } from "react";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Stack } from "@mui/material";

import WarningIcon from "@mui/icons-material/Warning";

import LocalizationKey from "~/i18n/key";
import { CustomButton } from "~/components/form/button";
import { Modal, SvgIcon } from "~/components";

type ModalType =
  | "error"
  | "warning"
  | "success"
  | "unauthorized"
  | "idleTimeOut";

interface NotificationModalProps {
  onConfirm?: () => void;
  open: boolean;
  onClose?: () => void;
  message?: string | ReactNode;
  onCloseLabel?: string;
  onConfirmLabel?: string;
  type?: ModalType;
  title?: string;
}

const renderIcon = (type: ModalType): ReactElement => {
  switch (type) {
    case "error":
    case "warning":
    case "unauthorized":
      return <SvgIcon name="warning" $size={8} />;
    case "idleTimeOut":
      return <WarningIcon color="error" sx={{ fontSize: 40 }} />;
    case "success":
    default:
      return <WarningIcon color="success" />;
  }
};

export const NotificationModal: React.FC<NotificationModalProps> = ({
  type = "error",
  onConfirm,
  open,
  onClose,
  message = "",
  onCloseLabel,
  onConfirmLabel,
  title,
}): ReactElement => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    if (onClose) onClose();
    setIsOpen(false);
  };

  switch (type) {
    case "unauthorized":
    default:
      return (
        <Modal
          open={isOpen}
          title={title as string}
          maxWidth="xs"
          onClose={() => {
            setIsOpen(false);
            if (onClose) {
              onClose();
            }
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            {renderIcon(type)}
            <Box maxWidth={250} textAlign="center">
              {message || t(LocalizationKey.common.errorMessage.genericError)}
            </Box>
          </Stack>

          <Box display="flex" justifyContent="center" my={2}>
            {onCloseLabel && (
              <CustomButton
                variant="contained"
                colorVariant="neutral"
                onClick={handleClose}
                style={{ marginRight: 16 }}
              >
                {onCloseLabel || t(LocalizationKey.common.cancelBtn)}
              </CustomButton>
            )}

            <CustomButton
              variant="contained"
              color="primary"
              onClick={() => {
                setIsOpen(false);
                if (onConfirm) {
                  onConfirm();
                }
              }}
            >
              {onConfirmLabel || t(LocalizationKey.common.okayBtn)}
            </CustomButton>
          </Box>
        </Modal>
      );
  }
};

export default NotificationModal;
