import { BroadcastChannel } from "broadcast-channel";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

import { CHANNELS } from "~/utils/constants";

type ErrorModalType = {
  showUnauthorizedModal: boolean;
  setShowUnauthorizedModal?: Dispatch<SetStateAction<boolean>>;
  systemErrorModal: boolean;
  setSystemErrorModal?: Dispatch<SetStateAction<boolean>>;
};

export const useErrorModals = (): ErrorModalType => {
  const { items, events } = CHANNELS;
  const channel = new BroadcastChannel(items.sessionState);

  const [showUnauthorizedModal, setShowUnauthorizedModal] =
    useState<boolean>(false);
  const [systemErrorModal, setSystemErrorModal] = useState<boolean>(false);

  useEffect(() => {
    const handleMessage = (message: string) => {
      switch (message) {
        case events.unauthorized:
          setShowUnauthorizedModal(true);
          break;
        case events.systemError:
          setSystemErrorModal(true);
          break;
        default:
          break;
      }
    };

    channel.onmessage = handleMessage;

    return () => {
      channel.close();
    };
  }, []);

  return {
    showUnauthorizedModal: showUnauthorizedModal,
    systemErrorModal: systemErrorModal,
    setShowUnauthorizedModal: setShowUnauthorizedModal,
    setSystemErrorModal: setSystemErrorModal,
  };
};
