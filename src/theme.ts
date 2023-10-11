import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C8ED1",
      dark: "#414145",
      light: "#ADDEFF",
      contrastText: "#F9F4F4",
    },
    secondary: {
      main: "#D54147",
    },
    background: {
      default: "#FEFEFE",
      paper: "#F5F5F5",
    },
    success: {
      main: "#85DD74",
    },
    warning: {
      main: "#ffd633",
    },
    error: {
      main: "#FF4545",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#333",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#555",
    },
    body1: {
      fontSize: "1rem",
      color: "#777",
    },
  },
  spacing: 8,
  // components: {
  //   MuiContainer: {
  //     styleOverrides: {
  //       root: {
  //         padding: "0 0 10px 0 !important",
  //       },
  //     },
  //   },
  // },
});

export default theme;
