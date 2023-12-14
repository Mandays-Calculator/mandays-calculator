import { BroadcastChannel } from "broadcast-channel";
import { useState, useEffect } from "react";

import { CHANNELS } from "~/utils/constants";

export const useUnauthorizedModal = () => {
  const { items, events } = CHANNELS;
  const channel = new BroadcastChannel(items.sessionState);
  const [showUnauthorizedModal, setShowUnauthorizedModal] =
    useState<boolean>(false);

  useEffect(() => {
    channel.onmessage = (message: string) => {
      if (message === events.unauthorized) {
        setShowUnauthorizedModal(true);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  return showUnauthorizedModal;
};
