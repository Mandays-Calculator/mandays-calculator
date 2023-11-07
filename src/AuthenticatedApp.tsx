import type { ReactElement } from "react";

import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { Auth } from "~/pages/auth";
import { PageLoader, Layout } from "~/components";
import AppRoutes from "~/routes/AppRoutes";
import axiosInit from "~/api/axios.config";

import { getUser } from "~/utils/oidc-utils";
import { getEnvConfig } from "~/utils/env-config";

const AuthenticatedApp = (): ReactElement => {
  const auth = useAuth();
  const user = getUser();
  const config = getEnvConfig();

  useEffect(() => {
    if (user?.access_token) {
      axiosInit(user?.access_token);
    }
  }, [user]);

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <PageLoader />;
  }

  if (!config.enableAuth) {
    return (
      <Layout>
        <AppRoutes />
      </Layout>
    );
  } else {
    if (auth.isAuthenticated) {
      return (
        <Layout>
          <AppRoutes />
        </Layout>
      );
    }
    return <Auth />;
  }
};

export default AuthenticatedApp;
