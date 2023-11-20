import React, { useRef, useEffect, ComponentType, ReactElement } from "react";
import { IIdleTimer, IdleTimerProvider } from "react-idle-timer";
import { BroadcastChannel } from "broadcast-channel";

interface WithIdleTimerProps {
  onIdle?: () => void;
  onActive?: () => void;
  timeout?: number;
}

const withIdleTimer = <P extends object>(
  WrappedComponent: ComponentType<P>,
  { onIdle, onActive, timeout }: WithIdleTimerProps
): ComponentType<P> => {
  return (props: P): ReactElement => {
    const idleTimerRef = useRef<IIdleTimer>(null);
    const channel = new BroadcastChannel("idle_timer_channel");

    useEffect(() => {
      channel.onmessage = (message: string) => {
        if (message === "idle") {
          console.log("Should show message");
          // Handle cross-tab idle state
        } else if (message === "active") {
          console.log("show reset");
        }
      };

      return () => {
        channel.close();
      };
    }, []);

    const handleOnIdle = () => {
      channel.postMessage("idle");
      if (onIdle) onIdle();
    };

    const handleOnActive = () => {
      channel.postMessage("active");
      if (onActive) onActive();
    };

    return (
      <React.Fragment>
        <IdleTimerProvider
          ref={idleTimerRef}
          timeout={timeout}
          onIdle={handleOnIdle}
          onActive={handleOnActive}
          debounce={250}
        />
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withIdleTimer;
