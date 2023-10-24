import type { ReactElement } from "react";

import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { Auth } from "~/pages/auth";
import { Layout } from "~/components/layout";
import AppRoutes from "~/routes/AppRoutes";
import axiosInit from "~/api/axios.config";

import { getUser } from "~/utils/oidc-utils";

const AuthenticatedApp = (): ReactElement => {
  const auth = useAuth();
  const user = getUser();

  useEffect(() => {
    axiosInit(user?.access_token);
  }, [auth]);

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (!auth.isAuthenticated) {
    return (
      <Layout>
        <AppRoutes />
      </Layout>
    );
  }
  return <Auth />;
};

export default AuthenticatedApp;
