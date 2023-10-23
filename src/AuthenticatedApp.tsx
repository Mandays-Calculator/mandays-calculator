import type { ReactElement } from "react";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { Layout } from "~/components/layout";
import AppRoutes from "~/routes/AppRoutes";
import { Auth } from "./pages/auth";
import axiosInit from "~/api/axios.config";
import { User } from "oidc-client-ts";

function getUser() {
  const oidcStorage = localStorage.getItem(
    `oidc.user:<your authority>:<your client id>`
  );
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}

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

  console.log(auth, "auth");
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
