import type { ReactElement } from "react";
import type { RealmConfigType } from "./utils/env-config";
import { getEnvConfig, keycloakOptions } from "./utils/env-config";
import Keycloak from "keycloak-js";
import { Auth } from "~/pages/auth";
import AuthenticatedApp from "~/AuthenticatedApp";
import { ReactKeycloakProvider } from "@react-keycloak/web";

const KeycloakApp = (): ReactElement => {
  const config = getEnvConfig();
  const isAuthenticated = true;

  const kcConfig: RealmConfigType = config.rhsso;
  const kcClient = new Keycloak({
    ...kcConfig,
  });

  return (
    <ReactKeycloakProvider authClient={kcClient} initOptions={keycloakOptions}>
      {isAuthenticated ? <AuthenticatedApp /> : <Auth />}
    </ReactKeycloakProvider>
  );
};

export default KeycloakApp;
