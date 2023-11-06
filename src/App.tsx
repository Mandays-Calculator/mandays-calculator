import type { ReactElement } from "react";
import type { ConfigType } from "~/utils/env-config";
import _ from "lodash";
import { useEffect, useState } from "react";
import { PageLoader } from "./components";
import { loadConfig } from "~/utils/env-config";
import AuthenticatedApp from "./AuthenticatedApp";
import { AuthProvider } from "react-oidc-context";

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
