import { Typography, styled } from "@mui/material";

export const StyledError = styled(Typography)({
  color: "#FF4545",
  fontSize: "0.85rem",
  lineHeight: "1.66",
  textAlign: "left",
  margin: "3px 14px 0",
});

export const StyledLabel = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "16px",
}));