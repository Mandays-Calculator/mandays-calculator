import type { ReactElement } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import Login from "~/pages/login";
import ODCManagement from "./pages/odc-management";
import UserManagement from "./pages/user-management";
import ProjectManagement from "./pages/project-management";

const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/odc-management" element={<ODCManagement />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/project-management" element={<ProjectManagement />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
