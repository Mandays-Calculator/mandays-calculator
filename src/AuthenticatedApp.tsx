import type { ReactElement } from "react";
import type { AppDispatch } from "~/redux/store";
import type { UserPermissionState } from "~/redux/reducers/user/types";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";

import { PageLoader, Layout, NotificationModal } from "~/components";
import LocalizationKey from "~/i18n/key";

import { getUser, logout } from "~/utils/oidc-utils";
import { getEnvConfig } from "~/utils/env-config";
import { LOCAL_STORAGE_ITEMS } from "~/utils/constants";

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
  const config = getEnvConfig();

  const auth = useAuth();
  const user = getUser();

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const userState: UserPermissionState = useSelector(selectUser);

  const [showUnauthorizedModal, setShowUnauthorizedModal] =
    useState<boolean>(false);

  useEffect(() => {
    axiosInit();
    if (user && auth.isAuthenticated) {
      dispatch(
        fetchUserPermission({
          onSuccess: () => navigate("./"),
          onFailure: () => navigate("./permission-error"),
        })
      );
    }

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

  const AuthApp = (): ReactElement => (
    <Layout>
      <AppRoutes isAuthenticated={!config.enableAuth || auth.isAuthenticated} />
    </Layout>
  );

  const IdleWrappedApp = useIdleTimer(AuthApp, {
    timeout: config.idleTimeoutConfig.durationUntilPromptSeconds,
  });

  const renderAuth = (): ReactElement => {
    if (auth.activeNavigator === "signinSilent") {
      return (
        <PageLoader
          labelOnLoad={t(
            LocalizationKey.common.userManagement.authSignInLoading
          )}
        />
      );
    }

    if (auth.activeNavigator === "signoutRedirect") {
      return (
        <PageLoader
          labelOnLoad={t(
            LocalizationKey.common.userManagement.authSignOutLoading
          )}
        />
      );
    }

    if (auth.isLoading || userState.loading) {
      return (
        <PageLoader
          labelOnLoad={t(
            LocalizationKey.common.userManagement.authPermissionLoading
          )}
        />
      );
    }

    if (!config.enableAuth || auth.isAuthenticated) {
      return <IdleWrappedApp />;
    }

    return <AppRoutes isAuthenticated={false} />;
  };

  const handleLogout = (): void => {
    logout(auth, () => {
      dispatch(resetUserState());
    });
  };

  const RenderModal = (): ReactElement => (
    <>
      {showUnauthorizedModal && (
        <NotificationModal
          type="unauthorized"
          message={t(LocalizationKey.common.errorMessage.unauthorized)}
          open={showUnauthorizedModal}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
  return (
    <>
      {renderAuth()}
      <RenderModal />
    </>
  );
};

export default AuthenticatedApp;
