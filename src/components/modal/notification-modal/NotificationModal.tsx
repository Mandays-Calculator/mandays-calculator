import type { ReactElement, ReactNode } from "react";
import type { ModalType, NotificationModalProps } from "./types";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";

import { Modal, SvgIcon } from "~/components";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

import {
  StyledIconButton,
  StyledModalHeader,
  StyledModalTitle,
  StyledTitlePosition,
} from "./styles";

const renderIcon = (type: ModalType): ReactElement => {
  switch (type) {
    case "success":
      return <WarningIcon color="success" />;
    case "error":
    case "warning":
    case "unauthorized":
    default:
      return <SvgIcon name="warning" $size={8} />;
  }
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  type = "error",
  onConfirm,
  open,
  message,
  onClose,
  onCloseLabel,
  onConfirmLabel,
  title,
  modalTitle,
  disableCloseHeader = false,
}): ReactElement => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    setIsOpen(open);
    return () => {
      setIsOpen(false);
    };
  }, [open]);

  const handleClose = () => {
    if (onClose) onClose();
    setIsOpen(false);
  };

  const renderHeader = (): ReactNode => {
    if (modalTitle) {
      return (
        <>
          {typeof modalTitle === "string" ? (
            <StyledModalHeader sx={{ p: 1 }} type={type}>
              {!disableCloseHeader && (
                <StyledIconButton color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="large" />
                </StyledIconButton>
              )}
              <StyledTitlePosition>
                <StyledModalTitle variant="h5" align="left">
                  {modalTitle || t(LocalizationKey.common.idleTimeOutTitle)}
                </StyledModalTitle>
              </StyledTitlePosition>
            </StyledModalHeader>
          ) : (
            modalTitle
          )}
        </>
      );
    }
  };

  const renderContent = (): ReactNode => {
    switch (type) {
      case "idleTimeOut":
        return (
          <>
            {modalTitle && renderHeader()}
            <Grid
              container
              spacing={1}
              mb={3}
              alignItems={"center"}
              sx={{ pt: modalTitle ? 5 : 0 }}
            >
              <Grid item xs={12}>
                <Typography variant="body1" textAlign={"center"}>
                  {message ||
                    t(LocalizationKey.common.errorMessage.genericError)}
                </Typography>
              </Grid>
            </Grid>
          </>
        );
      default:
        return (
          <>
            {modalTitle && renderHeader()}
            <Grid
              container
              spacing={1}
              mb={3}
              alignItems={"center"}
              sx={{ pt: modalTitle ? 5 : 0 }}
            >
              <Grid item xs={2}>
                {renderIcon(type)}
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body1" textAlign={"center"}>
                  {message ||
                    t(LocalizationKey.common.errorMessage.genericError)}
                </Typography>
              </Grid>
            </Grid>
          </>
        );
    }
  };

  return (
    <Modal
      open={isOpen}
      maxWidth="lg"
      title={title as string}
      onClose={handleClose}
    >
      <Stack sx={{ p: 3 }}>
        {renderContent()}
        <Box display="flex" justifyContent="center" textAlign={"center"}>
          {onCloseLabel && (
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ mr: 3, width: 150, fontSize: 14 }}
            >
              {onCloseLabel || t(LocalizationKey.common.cancelBtn)}
            </Button>
          )}

          <CustomButton
            variant="contained"
            colorVariant={type !== "success" ? "error" : "primary"}
            sx={{ width: 150, fontSize: 14 }}
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
      </Stack>
    </Modal>
  );
};

export default NotificationModal;
