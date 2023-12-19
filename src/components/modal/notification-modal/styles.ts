import { styled } from "@mui/material/styles";
import { Box, IconButton, Typography, Theme } from "@mui/material";
import { ModalType } from "./types";

const headerBgProperties = {
  success: "#85DD74",
  warning: "#FFD633",
  primary: "#2C8ED1",
  error: "#D54147",
  unauthorized: "#D54147",
  idleTimeOut: "#D54147",
  systemError: "#D54147",
};

export const StyledModalTitle = styled(Typography)({
  color: "#fff",
  fontWeight: "bold",
  margin: ".55rem 0 0 .55rem",
});

type StyledModalHeaderProps = {
  theme?: Theme;
  type: ModalType;
};

export const StyledModalHeader = styled(Box)(
  ({ theme, type }: StyledModalHeaderProps) => ({
    top: 0,
    left: 0,
    width: "100%",
    height: "4.5rem",
    position: "absolute",
    background: headerBgProperties[type] || theme?.palette.primary.main,
  })
);

export const StyledIconButton = styled(IconButton)({
  position: "absolute",
  top: 5,
  right: 8,
  color: "white",
});

export const StyledTitlePosition = styled(Box)({
  position: "absolute",
  top: 8,
  left: 8,
});
