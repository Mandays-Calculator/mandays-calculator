import type { ReactElement, ReactNode } from "react";

import { useEffect, useState } from "react";
import { CustomButton } from "~/components/form/button";
import Modal from "~/components/modal/Modal";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, Stack } from "@mui/material";

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
      return <WarningIcon color="error" sx={{ fontSize: 40 }} />;
    case "unauthorized":
      return <WarningIcon color="warning" sx={{ fontSize: 70 }} />;
    case "warning":
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
  message,
  onCloseLabel,
  onConfirmLabel,
  title,
}): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

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
              {message}
            </Box>
          </Stack>

          <Box display="flex" justifyContent="center" my={2}>
            {onCloseLabel && (
              <CustomButton
                variant="contained"
                colorVariant="neutral"
                onClick={onClose}
                style={{ marginRight: 16 }}
              >
                {onCloseLabel}
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
              {onConfirmLabel || "Okay"}
            </CustomButton>
          </Box>
        </Modal>
      );
  }
};

export default NotificationModal;
