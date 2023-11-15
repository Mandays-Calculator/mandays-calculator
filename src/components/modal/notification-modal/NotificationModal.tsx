import type { ReactElement } from "react";

import { useEffect, useState } from "react";
import { CustomButton } from "~/components/form/button";
import Modal from "~/components/modal/Modal";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, Stack } from "@mui/material";

type ModalType = "error" | "warning" | "success" | "unauthorized";

interface NotificationModalProps {
  onConfirm?: () => void;
  open: boolean;
  onClose?: () => void;
  message?: string;
  onCloseLabel?: string;
  onConfirmLabel?: string;
  type?: ModalType;
}

const renderIcon = (type: ModalType): ReactElement => {
  // need to change depends on type
  switch (type) {
    case "error":
    case "warning":
    case "success":
      return <WarningIcon color="error" style={{ fontSize: 40 }} />;
    default:
      return <WarningIcon color="error" style={{ fontSize: 40 }} />;
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
}): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  switch (type) {
    case "unauthorized":
      return <></>;
    default:
      return (
        <Modal
          open={isOpen}
          title=""
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
