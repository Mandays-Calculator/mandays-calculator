import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "~/theme";

import App from "~/App.tsx";
import { store } from "~/redux/store";
import "~/i18n";
import "react-datepicker/dist/react-datepicker.css";
import "virtual:svg-icons-register";
import "./app.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const rootElement = document.getElementById("root");
const renderApp = () => {
  ReactDOM.createRoot(rootElement!).render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>,
  );
};

renderApp();
