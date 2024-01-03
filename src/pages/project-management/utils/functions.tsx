import { useRef } from 'react';

export function useTimeout() {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const triggerTimeout = (onTimeout: () => void, delay: number = 2000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => onTimeout(), delay);
  };

  return [triggerTimeout];
}
