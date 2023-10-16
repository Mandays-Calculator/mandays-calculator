import type { ReactElement } from "react";
import { Layout } from "~/components/layout";
import AppRoutes from "~/routes/AppRoutes";

const AuthenticatedApp = (): ReactElement => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default AuthenticatedApp;
