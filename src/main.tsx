import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "react-oidc-context";
import theme from "~/theme";

import App from "~/App.tsx";
import { OIDCConfig } from "~/utils/env-config";
import { store } from "~/redux/store";
import "~/i18n";
import "react-datepicker/dist/react-datepicker.css";
import "virtual:svg-icons-register";
import "./app.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider {...OIDCConfig}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  </AuthProvider>
);
