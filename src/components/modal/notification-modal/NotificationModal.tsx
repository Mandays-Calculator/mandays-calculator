import type { ReactElement, ReactNode } from "react";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import WarningIcon from "@mui/icons-material/Warning";

import { Modal, SvgIcon } from "~/components";
import LocalizationKey from "~/i18n/key";
import { CustomButton } from "~/components/form/button";

import { ModalType, NotificationModalProps } from "./types";

const StyledModalTitle = styled(Typography)({
  color: "white",
  fontWeight: "bold",
  margin: ".55rem 0 0 .55rem",
});

const StyledModalHeader = styled(Box)(({ theme }) => ({
  top: 0,
  left: 0,
  width: "100%",
  height: "4.5rem",
  position: "absolute",
  background: theme.palette.primary.main,
}));

const StyledIconButton = styled(IconButton)({
  position: "absolute",
  top: 5,
  right: 8,
  color: "white",
});

const StyledTitlePosition = styled(Box)({
  position: "absolute",
  top: 8,
  left: 8,
});

const renderIcon = (type: ModalType): ReactElement => {
  switch (type) {
    case "error":
    case "warning":
    case "unauthorized":
      return <SvgIcon name="warning" $size={8} />;
    case "success":
      return <WarningIcon color="success" />;
    default:
      return <></>;
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

  const renderHeader = (): ReactNode => {
    if (modalTitle) {
      return (
        <>
          {typeof modalTitle === "string" ? (
            <StyledModalHeader sx={{ p: 1 }}>
              <StyledIconButton color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="large" />
              </StyledIconButton>
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
              sx={{ mr: 3, width: 150, fontSize: 10 }}
            >
              {onCloseLabel || t(LocalizationKey.common.cancelBtn)}
            </Button>
          )}

          <CustomButton
            variant="contained"
            color="primary"
            sx={{ width: 150, fontSize: 10 }}
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
