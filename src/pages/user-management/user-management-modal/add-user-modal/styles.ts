import { FormControlLabel, styled, Typography } from "@mui/material";

export const StyledModalTitle = styled(Typography)({
  fontWeight: 600,
  fontStyle: "normal",
  fontFamily: "Montserrat",
  color: "#414145",
  fontSize: "1.125rem",
  paddingBottom: "18px",
});

export const StyledTitle = styled(Typography)({
  color: "#414145",
  fontSize: 14,
  lineHeight: "1.8",
  fontFamily: "Montserrat",
  fontWeight: "400",
  wordWrap: "break-word",
});

export const StyledError = styled(Typography)({
  color: "#FF4545",
  fontSize: "0.75rem",
  fontFamily: "Montserrat",
  fontWeight: "400",
  marginTop: "3px",
  marginBottom: "0",
  marginLeft: "12px",
});
export const StyledFormControlLabel = styled(FormControlLabel)({
  height: "35px",
});
