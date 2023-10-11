import type { ReactElement } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { store } from "./redux/store";
import { Footer } from "./components/footer";
import { Login } from "~/pages/auth/login";
import { ODCManagement } from "./pages/odc-management";
import { UserManagement } from "./pages/user-management";
import { ProjectManagement } from "./pages/project-management";

const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/odc-management" element={<ODCManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/project-management" element={<ProjectManagement />} />
          </Routes>
        </Router>
        <Footer />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
