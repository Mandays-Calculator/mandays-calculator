import type { AlertTypes, AlertProps } from "./types";
import { ReactElement, SyntheticEvent, useEffect, useState } from "react";

import { IconButton, SnackbarCloseReason } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  CustomSnackbar,
  CustomAlert,
  StyledTitle,
  StyledDescription,
} from "./styles";

const renderTitle = (type: AlertTypes | undefined): string => {
  switch (type) {
    case "error":
      return "Error";
    case "warning":
      return "Warning";
    case "success":
      return "Success";
    default:
      return "";
  }
};

const Alert = (props: AlertProps): ReactElement => {
  const { type = "error", open, duration = 5000, message } = props;
  const [openAlert, setOpenAlert] = useState<boolean>(open);

  useEffect(() => {
    setOpenAlert(openAlert);
    return () => {
      setOpenAlert(false);
    };
  }, [open]);

  const handleClose = (
    _event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <CustomSnackbar
      type={type}
      open={openAlert}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <CustomAlert
        type={type}
        elevation={6}
        variant="filled"
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setOpenAlert(false)}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        }
      >
        <StyledTitle type={type} fontWeight={"bold"}>
          {renderTitle(type)}
        </StyledTitle>
        <StyledDescription type={type}>{message}</StyledDescription>
      </CustomAlert>
    </CustomSnackbar>
  );
};

export default Alert;
