import type { ReactElement } from "react";

import { AuthProvider } from "react-oidc-context";
import _ from "lodash";

import { useConfig } from "~/utils/env-config";
import { PageLoader } from "./components";
import AuthenticatedApp from "./AuthenticatedApp";

const App = (): ReactElement => {
  const environment = import.meta.env.VITE_ENVIRONMENT;
  const config = useConfig(environment);

  if (!_.isUndefined(config)) {
    const OIDCConfig = {
      ...config.oidcConfig,
      client_secret: import.meta.env.VITE_SECRET_KEY,
      redirect_uri: window.location.origin,
    };

    return (
      <AuthProvider {...OIDCConfig}>
        <AuthenticatedApp />
      </AuthProvider>
    );
  }

  return <PageLoader />;
};

export default App;
