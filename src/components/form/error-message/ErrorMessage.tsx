import type { ReactElement } from "react";
import { Alert, Snackbar, Stack } from "@mui/material";

type ErrorMessageProps = {
  error?: string;
  type?: "alert" | "default";
};

const ErrorMessage = (props: ErrorMessageProps): ReactElement | null => {
  const { error, type = "default" } = props;

  if (error) {
    switch (type) {
      case "alert":
        return (
          <Snackbar
            open={error !== ""}
            autoHideDuration={300}
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
