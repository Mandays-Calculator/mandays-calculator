import { ReactElement } from "react";
import { Alert, Stack, Typography, styled } from "@mui/material";
import { Alert as CustomAlert } from "~/components";

type ErrorMessageProps = {
  error?: string;
  type?: "alert" | "default" | "field";
};

export const StyledError = styled(Typography)({
  color: "#FF4545",
  fontSize: "0.9rem",
  fontFamily: "Montserrat",
  fontWeight: "400",
  marginTop: "3px",
  marginBottom: "0",
  marginLeft: "12px",
});

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
    if (type === "field") {
      return <StyledError>{error}</StyledError>;
    }
    return <CustomAlert type="error" open={error !== ""} message={error} />;
  }
  return null;
};

export default ErrorMessage;
