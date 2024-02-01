import React, { useState, useEffect, ComponentType, ReactElement } from "react";
import { IdleTimerProvider } from "react-idle-timer";
import { BroadcastChannel } from "broadcast-channel";

import { Timer } from "~/components";
import NotificationModal from "~/components/modal/notification-modal/NotificationModal";

import { useTranslation } from "react-i18next";
import LocalizationKey from "~/i18n/key";
import { getEnvConfig } from "~/utils/env-config";
import { useUserAuth } from "../user";

interface WithIdleTimerProps {
  timeout?: number;
}

export const useIdleTimer = <P extends object>(
  WrappedComponent: ComponentType<P>,
  { timeout }: WithIdleTimerProps,
): ComponentType<P> => {
  return (props: P): ReactElement => {
    const [isIdle, setIsIdle] = useState<boolean>(false);
    const { logout } = useUserAuth();
    const config = getEnvConfig();
    const { t } = useTranslation();
    const channel = new BroadcastChannel("idle_timer_channel");

    const { common } = LocalizationKey;

    useEffect(() => {
      channel.onmessage = (message: string) => {
        if (message === "idle") {
          setIsIdle(true);
        } else if (message === "active") {
          setIsIdle(false);
        }
      };

      return () => {
        channel.close();
      };
    }, []);

    const handleOnIdle = (): void => {
      channel.postMessage("idle");
      setIsIdle(true);
    };

    const handleOnActive = (): void => {
      channel.postMessage("active");
      setIsIdle(false);
    };

    return (
      <React.Fragment>
        <IdleTimerProvider
          timeout={timeout}
          onIdle={handleOnIdle}
          debounce={250}
        />
        <WrappedComponent {...props} />
        <NotificationModal
          type="idleTimeOut"
          modalTitle={t(common.idleTimeOutTitle)}
          message={
            <>
              {t(common.idleTimeOutLabel)}:{" "}
              <Timer
                onEndCountdown={logout}
                milliseconds={
                  config.idleTimeoutConfig.confirmationWindowSeconds
                }
              />
            </>
          }
          disableCloseHeader={true}
          open={isIdle}
          onClose={logout}
          onCloseLabel={t(common.logout)}
          onConfirmLabel={t(common.idleTimeOutButtonLoggedIn)}
          onConfirm={handleOnActive}
        />
      </React.Fragment>
    );
  };
};
