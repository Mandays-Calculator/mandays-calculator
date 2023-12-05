import { Alert, Snackbar, Typography, styled } from "@mui/material";
import { AlertTypes } from "./types";

interface PropsType {
  type: AlertTypes;
}

const AlertColorProperties = {
  success: "#177006",
  warning: "#796101",
  primary: "#2C8ED1",
  error: "#D54147",
};

const AlertBorderProperties = {
  success: "#85DD74",
  warning: "#FFD633",
  primary: "#2C8ED1",
  error: "#D54147",
};

const AlertBgColorProperties = {
  success: "#D5FFCD",
  warning: "#FFF6D2",
  primary: "#A9DCFF",
  error: "#FFCECE",
};

export const CustomSnackbar = styled(Snackbar)(({ type }: PropsType) => ({
  "& .MuiPaper-root": {
    padding: "20px 16px",
    backgroundColor: AlertBgColorProperties[type],
    borderTop: `1px solid ${AlertBorderProperties[type]}`,
    borderLeft: `8px solid ${AlertBorderProperties[type]}`,
    borderRight: `1px solid ${AlertBorderProperties[type]}`,
    borderBottom: `1px solid ${AlertBorderProperties[type]}`,
    borderRadius: "6px",
    boxShadow: "none",
    width: 400,
  },
}));

export const CustomAlert = styled(Alert)(({ type }: PropsType) => ({
  maxWidth: 350,
  color: AlertColorProperties[type],
  backgroundColor: AlertBgColorProperties[type],
  fontSize: "0.875rem",
  alignItems: "center",
  borderRadius: "4px",
  "& .MuiAlert-icon": {
    fontSize: "2rem",
    margin: "0px 12px 0px 0px",
  },
  "& .MuiAlert-message": {
    padding: "8px 0",
  },
  "& .MuiAlert-action": {
    marginRight: "8px",
  },
}));

export const StyledTitle = styled(Typography)(({ type }: PropsType) => ({
  color: `${AlertColorProperties[type]}`,
  fontSize: "0.9rem",
  fontWeight: "bold",
}));

export const StyledDescription = styled(Typography)(({ type }: PropsType) => ({
  color: `${AlertColorProperties[type]}`,
  fontSize: "0.75rem",
  fontWeight: "bold",
}));
