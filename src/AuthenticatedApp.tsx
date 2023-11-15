import type { ReactElement } from "react";
import type { AppDispatch } from "~/redux/store";
import type { UserPermissionState } from "~/redux/reducers/user/types";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "react-oidc-context";

import LocalizationKey from "~/i18n/key";
import { Auth } from "~/pages/auth";
import { PageLoader, Layout } from "~/components";

import { getUser } from "~/utils/oidc-utils";
import { getEnvConfig } from "~/utils/env-config";
import AppRoutes from "~/routes/AppRoutes";
import axiosInit from "~/api/axios.config";

import { fetchUserPermission, selectUser } from "~/redux/reducers/user";
import NotificationModal from "./components/modal/notification-modal/NotificationModal";
import { ERROR_MESSAGES } from "./utils/constants/constants";

const AuthenticatedApp = (): ReactElement => {
  const auth = useAuth();
  const user = getUser();
  const config = getEnvConfig();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const userState: UserPermissionState = useSelector(selectUser);

  const { common } = LocalizationKey;

  useEffect(() => {
    if (user) {
      axiosInit(user.access_token);
      dispatch(fetchUserPermission());
    }
  }, [auth]);

  const renderAuth = (): ReactElement => {
    switch (auth.activeNavigator) {
      case "signinSilent":
        return (
          <PageLoader
            labelOnLoad={t(common.userManagement.authSignInLoading)}
          />
        );
      case "signoutRedirect":
        return (
          <PageLoader
            labelOnLoad={t(common.userManagement.authSignOutLoading)}
          />
        );
    }

    if (auth.isLoading || userState.loading) {
      return (
        <PageLoader
          labelOnLoad={t(common.userManagement.authPermissionLoading)}
        />
      );
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

  return (
    <>
      {renderAuth()}
      <NotificationModal
        type="error"
        message={ERROR_MESSAGES.permission}
        open={userState.error !== null}
      />
    </>
  );
};

export default AuthenticatedApp;
