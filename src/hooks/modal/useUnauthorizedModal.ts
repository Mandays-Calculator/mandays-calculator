import { BroadcastChannel } from "broadcast-channel";
import { useState, useEffect } from "react";

import { CHANNELS } from "~/utils/constants";

type ErrorModalType = {
  showUnauthorizedModal: boolean;
  systemErrorModal: boolean;
};

export const useErrorModals = (): ErrorModalType => {
  const { items, events } = CHANNELS;
  const channel = new BroadcastChannel(items.sessionState);
  const [showUnauthorizedModal, setShowUnauthorizedModal] =
    useState<boolean>(false);

  const [systemErrorModal, setSystemErrorModal] = useState<boolean>(false);

  useEffect(() => {
    channel.onmessage = (message: string) => {
      if (message === events.unauthorized) {
        setShowUnauthorizedModal(true);
      }
    };

    channel.onmessage = (message: string) => {
      if (message === events.systemError) {
        setSystemErrorModal(true);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  return {
    showUnauthorizedModal: showUnauthorizedModal,
    systemErrorModal: systemErrorModal,
  };
};
