import type { ReactElement } from "react";
import { Layout } from "~/components/layout";
import AppRoutes from "~/routes/AppRoutes";

const App = (): ReactElement => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;
