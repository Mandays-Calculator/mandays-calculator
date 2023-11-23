import type { ReactElement } from "react";
import type { AppDispatch } from "~/redux/store";
import type { UserPermissionState } from "~/redux/reducers/user/types";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "react-oidc-context";

import { PageLoader, Layout, NotificationModal } from "~/components";
import LocalizationKey from "~/i18n/key";

import { getUser, logout } from "~/utils/oidc-utils";
import { getEnvConfig } from "~/utils/env-config";
import { ERROR_MESSAGES, LOCAL_STORAGE_ITEMS } from "~/utils/constants";

import { useIdleTimer } from "~/hooks/idle-timer";

import {
  getItemStorage,
  removeStorageListener,
  addStorageListener,
} from "~/utils/storageHelper";

import AppRoutes from "~/routes/AppRoutes";
import axiosInit from "~/api/axios.config";

import {
  fetchUserPermission,
  resetUserState,
  selectUser,
} from "~/redux/reducers/user";

const AuthenticatedApp = (): ReactElement => {
  const auth = useAuth();
  const user = getUser();
  const config = getEnvConfig();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const userState: UserPermissionState = useSelector(selectUser);
  const [showUnauthorizedModal, setShowUnauthorizedModal] =
    useState<boolean>(false);

  const { common } = LocalizationKey;

  useEffect(() => {
    /**
     * Initiate axios token once user is logged in
     */
    if (user) {
      axiosInit();
      dispatch(fetchUserPermission());
    }

    /**
     * Track changes in local storage items
     */
    const handleStorageChange = () => {
      const sessionState = getItemStorage(LOCAL_STORAGE_ITEMS.sessionState);
      setShowUnauthorizedModal(sessionState.unauthorized);
    };

    handleStorageChange();
    addStorageListener(handleStorageChange);
    return () => {
      setShowUnauthorizedModal(false);
      removeStorageListener(handleStorageChange);
    };
  }, [auth]);

  const AuthApp = (): ReactElement => {
    return (
      <Layout>
        <AppRoutes
          isAuthenticated={!config.enableAuth || auth.isAuthenticated}
        />
      </Layout>
    );
  };

  const IdleWrappedApp = useIdleTimer(AuthApp, {
    timeout: config.idleTimeoutConfig.durationUntilPromptSeconds,
  });

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
      return <IdleWrappedApp />;
    } else {
      if (auth.isAuthenticated) {
        return <IdleWrappedApp />;
      }
      return <AppRoutes isAuthenticated={false} />;
    }
  };

  const handleLogout = (): void => {
    logout(auth, () => {
      dispatch(resetUserState());
    });
  };

  const RenderModal = (): ReactElement => {
    return (
      <>
        {showUnauthorizedModal && (
          <NotificationModal
            type="unauthorized"
            message={t(common.errorMessage.unauthorized)}
            open={showUnauthorizedModal}
            onConfirm={handleLogout}
          />
        )}
        {userState.error !== null && (
          <NotificationModal
            type="error"
            message={ERROR_MESSAGES.permission}
            open={userState.error !== null}
            onConfirm={handleLogout}
          />
        )}
      </>
    );
  };

  return (
    <>
      {renderAuth()}
      <RenderModal />
    </>
  );
};

export default AuthenticatedApp;
