import { useRef } from 'react';

type UseTimeoutType = [(onTimeout: () => void, delay?: number) => void];

export function useTimeout(): UseTimeoutType {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const triggerTimeout = (onTimeout: () => void, delay: number = 2000): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => onTimeout(), delay);
  };

  return [triggerTimeout];
}
