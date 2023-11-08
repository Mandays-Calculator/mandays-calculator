import type { ReactElement } from "react";
import type { ConfigType } from "~/utils/env-config";

import { useEffect, useState } from "react";
import { AuthProvider } from "react-oidc-context";
import _ from "lodash";

import { loadConfig } from "~/utils/env-config";
import { PageLoader } from "./components";
import AuthenticatedApp from "./AuthenticatedApp";

const App = (): ReactElement => {
  const environment = import.meta.env.VITE_ENVIRONMENT;
  const [config, setConfig] = useState<ConfigType | undefined>(undefined);

  useEffect(() => {
    if (environment) {
      loadConfig(environment).then((res: ConfigType | null) => {
        if (res) {
          setConfig(res);
        }
      });
    }
  }, []);

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
