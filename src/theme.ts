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
      light: "#EAF3F4",
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1280,
      xl: 1367,
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    htmlFontSize: 14,
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#414145",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#414145",
    },
    body1: {
      fontSize: "1rem",
      color: "#414145",
    },
  },
  spacing: (factor: number) => `${0.5 * factor}rem`,
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#2c8ed1",
          textDecoration: "none",
          "&:hover": {
            color: "#4699D2",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: "16px",
          "@media (min-width:1280px)": {
            fontSize: "14px",
          },
        },
      },
    },
  },
});

export default theme;
