import type { ReactElement, PropsWithChildren } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "~/redux/store";
import theme from "~/theme";

const queryClient = new QueryClient();

const ProviderWrapper = (props: PropsWithChildren): ReactElement => {
  const { children } = props;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default ProviderWrapper;
