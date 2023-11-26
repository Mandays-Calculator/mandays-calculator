import { useState, useEffect, ReactElement, SyntheticEvent } from "react";
import { Alert, Snackbar, SnackbarCloseReason, Stack } from "@mui/material";

type ErrorMessageProps = {
  error?: string;
  type?: "alert" | "default";
  duration?: number;
};

const ErrorMessage = (props: ErrorMessageProps): ReactElement | null => {
  const { error, type = "default", duration = 3000 } = props;
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (error && type === "alert") {
      setOpen(true);
    }
  }, [error, type]);

  const handleClose = (
    _event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (error) {
    switch (type) {
      case "alert":
        return (
          <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        );
      default:
        return (
          <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>
        );
    }
  }
  return null;
};

export default ErrorMessage;
