import { ReactElement } from "react";
import { Alert, Stack } from "@mui/material";
import { Alert as CustomAlert } from "~/components";

type ErrorMessageProps = {
  error?: string;
  type?: "alert" | "default";
};

const ErrorMessage = (props: ErrorMessageProps): ReactElement | null => {
  const { error, type = "default" } = props;
  if (error) {
    if (type === "default") {
      return (
        <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      );
    }
    return <CustomAlert type="error" open={error !== ""} message={error} />;
  }
  return null;
};

export default ErrorMessage;
