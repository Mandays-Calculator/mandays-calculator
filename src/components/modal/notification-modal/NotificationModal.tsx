import type { ReactElement } from "react";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import WarningIcon from "@mui/icons-material/Warning";

import { Modal, SvgIcon } from "~/components";
import LocalizationKey from "~/i18n/key";
import { CustomButton } from "~/components/form/button";

import { ModalType, NotificationModalProps } from "./types";

const StyledModalTitle = styled(Typography)({
  color: "white",
  fontWeight: "bold",
  marginTop: ".5rem",
});

const StyledModalHeader = styled(Box)({
  top: 0,
  left: 0,
  width: "100%",
  height: "4.5rem",
  position: "absolute",
  background: "#1e90ff",
});

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
    case "idleTimeOut":
      return (
        <WarningIcon color="error" sx={{ marginTop: "1rem", fontSize: 45 }} />
      );
    case "success":
    default:
      return <WarningIcon color="success" />;
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

  const handleStayLoggedOn = () => {
    setIsOpen(false);
    if (onConfirm) onConfirm();
  };

  switch (type) {
    case "unauthorized":
    default:
  }

  return (
    <Modal
      open={isOpen}
      maxWidth="xs"
      title={title as string}
      onClose={handleClose}
    >
      <StyledModalHeader />

      <StyledIconButton color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="large" />
      </StyledIconButton>

      <StyledTitlePosition>
        <StyledModalTitle variant="h5" align="left">
          Session Timeout
        </StyledModalTitle>
      </StyledTitlePosition>

      <Grid container spacing={1}>
        <Grid item xs={1.5}>
          {renderIcon(type)}
        </Grid>
        <Grid item xs={10.5} mt={4} style={{ fontSize: "1.5rem" }}>
          {message || t(LocalizationKey.common.errorMessage.genericError)}
        </Grid>
      </Grid>

      <Box marginY="1rem" ml="4.7rem">
        {onCloseLabel && (
          <CustomButton
            variant="outlined"
            colorVariant="neutral"
            onClick={handleClose}
            style={{ color: "#1e90ff" }}
          >
            {onCloseLabel || t(LocalizationKey.common.cancelBtn)}
          </CustomButton>
        )}

        <CustomButton
          variant="contained"
          onClick={handleStayLoggedOn}
          style={{
            fontWeight: "bold",
            fontSize: "medium",
            padding: "1rem 2rem",
          }}
        >
          {onConfirmLabel || t(LocalizationKey.common.okayBtn)}
        </CustomButton>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
