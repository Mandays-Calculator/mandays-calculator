import { LOCAL_STORAGE_ITEMS } from "./constants";

interface SessionState {
  unauthorized: boolean;
}

const defaultSessionState: SessionState = {
  unauthorized: false,
};

export const initStorage = (): void => {
  localStorage.setItem(
    LOCAL_STORAGE_ITEMS.sessionState,
    JSON.stringify(defaultSessionState)
  );
};

export const getItemStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

export const setItemStorage = (key: string, objectValue: Object) => {
  localStorage.setItem(key, JSON.stringify(objectValue));
};

export const removeStateStorage = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_ITEMS.sessionState);
};

export const addStorageListener = (
  callback: EventListenerOrEventListenerObject
): void => {
  return window.addEventListener("storage", callback);
};

export const removeStorageListener = (
  callback: EventListenerOrEventListenerObject
): void => {
  return window.removeEventListener("storage", callback);
};
