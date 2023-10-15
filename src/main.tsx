import React from "react";
import ReactDOM from "react-dom/client";
// Providers
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "~/theme";

import App from "~/App.tsx";
import { store } from "~/redux/store";
import "~/i18n";
import "react-datepicker/dist/react-datepicker.css";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
