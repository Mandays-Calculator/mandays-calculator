import { useEffect } from "react";

export const useDisableBodyScroll = (open: boolean): void => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);
};
