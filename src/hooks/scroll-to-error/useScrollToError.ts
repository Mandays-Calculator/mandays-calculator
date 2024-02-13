import { useEffect } from "react";

export const useScrollToError = (): (() => void) => {
  const scrollToElement = () => {
    const element = document.querySelector(`.Mui-error`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    scrollToElement();
  }, []);

  return scrollToElement;
};
