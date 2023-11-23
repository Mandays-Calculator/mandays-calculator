import React, {
  useRef,
  useState,
  useEffect,
  ComponentType,
  ReactElement,
} from "react";
import { IIdleTimer, IdleTimerProvider } from "react-idle-timer";
import { BroadcastChannel } from "broadcast-channel";
import { useAuth } from "react-oidc-context";

import { NotificationModal, Timer } from "~/components";
import { logout } from "~/utils/oidc-utils";
import { useTranslation } from "react-i18next";
import LocalizationKey from "~/i18n/key";
import { getEnvConfig } from "~/utils/env-config";

interface WithIdleTimerProps {
  timeout?: number;
}

export const useIdleTimer = <P extends object>(
  WrappedComponent: ComponentType<P>,
  { timeout }: WithIdleTimerProps
): ComponentType<P> => {
  return (props: P): ReactElement => {
    const [isIdle, setIsIdle] = useState<boolean>(false);

    const config = getEnvConfig();
    const { t } = useTranslation();
    const auth = useAuth();
    const idleTimerRef = useRef<IIdleTimer>(null);
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

    const handleLogout = (): void => {
      logout(auth);
    };

    return (
      <React.Fragment>
        <IdleTimerProvider
          ref={idleTimerRef}
          timeout={timeout}
          onIdle={handleOnIdle}
          debounce={250}
        />
        <WrappedComponent {...props} />
        <NotificationModal
          type="idleTimeOut"
          message={
            <>
              {t(common.idleTimeOutLabel)}{" "}
              <Timer
                onEndCountdown={handleLogout}
                milliseconds={
                  config.idleTimeoutConfig.confirmationWindowSeconds
                }
              />
            </>
          }
          open={isIdle}
          onClose={handleLogout}
          onCloseLabel={t(common.logout)}
          onConfirmLabel={t(common.idleTimeOutButtonLoggedIn)}
          onConfirm={handleOnActive}
        />
      </React.Fragment>
    );
  };
};
