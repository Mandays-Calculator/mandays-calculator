import type { ReactElement } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Layout } from "~/components/layout";
import AppRoutes from "~/routes/AppRoutes";

const AuthenticatedApp = (): ReactElement => {
  const { keycloak } = useKeycloak();
  console.log(keycloak);
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default AuthenticatedApp;
