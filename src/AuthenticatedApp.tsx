import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { PageLoader, Layout, NotificationModal } from "~/components";
import LocalizationKey from "~/i18n/key";

import { useUserAuth, checkUserAuthentication } from "~/hooks/user";
import { useIdleTimer } from "~/hooks/idle-timer";
import { getEnvConfig } from "~/utils/env-config";

import AppRoutes from "~/routes/AppRoutes";
import axiosInit from "~/api/axios.config";
import { useDispatch } from "react-redux";
import { updateUserState } from "./redux/reducers/user";
import { useErrorModals } from "./hooks/modal";
import { removeStateStorage } from "./utils/helpers";

const AuthenticatedApp = (): ReactElement => {
  const config = getEnvConfig();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //loader used for checking if user is authenticated
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

  const {
    state: { loading, isAuthenticated, permissions },
    logout,
  } = useUserAuth();
  const { showUnauthorizedModal, systemErrorModal, setSystemErrorModal } =
    useErrorModals();

  useEffect(() => {
    setLoadingAuth(true);
    const { status, mcUser } = checkUserAuthentication();
    if (status && mcUser) {
      dispatch(updateUserState(mcUser));
    } else {
      removeStateStorage("session");
    }
    setLoadingAuth(false);
  }, []);

  useEffect(() => {
    axiosInit();
  }, [isAuthenticated]);

  const AuthIdleApp = useIdleTimer(
    (): ReactElement => (
      <Layout>
        <AppRoutes
          isAuthenticated={!config.enableAuth || isAuthenticated}
          rolePermissions={permissions}
        />
      </Layout>
    ),
    {
      timeout: config.idleTimeoutConfig.durationUntilPromptSeconds,
    },
  );

  const renderAuth = (): ReactElement => {
    if (loading || loadingAuth) {
      return (
        <PageLoader
          labelOnLoad={t(
            LocalizationKey.common.userManagement.authSignInLoading,
          )}
        />
      );
    }
    if (!config.enableAuth || isAuthenticated) {
      return <AuthIdleApp />;
    }
    return <AppRoutes isAuthenticated={false} rolePermissions={permissions} />;
  };

  return (
    <>
      {renderAuth()}
      <NotificationModal
        disableCloseHeader={true}
        type="unauthorized"
        message={t(LocalizationKey.common.errorMessage.unauthorized)}
        open={showUnauthorizedModal}
        onConfirm={logout}
        modalTitle={t(LocalizationKey.common.unauthorizedTitle)}
      />
      <NotificationModal
        disableCloseHeader={true}
        type="systemError"
        message={t(LocalizationKey.common.errorMessage.genericError)}
        open={systemErrorModal}
        onConfirm={() => {
          if (setSystemErrorModal) {
            setSystemErrorModal(false);
          }
        }}
        modalTitle={t(LocalizationKey.common.systemErrorTitle)}
      />
    </>
  );
};

export default AuthenticatedApp;
