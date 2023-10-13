import type { ReactElement } from "react";
import { Layout } from "~/components/layout";
import Login from "./pages/auth/login/Login";
import AppRoutes from "~/routes/AppRoutes";

const App = (): ReactElement => {
  return (
    // <Layout>
    //   <AppRoutes />
    // </Layout>
    <Login />
  );
};

export default App;
