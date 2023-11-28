import { LOCAL_STORAGE_ITEMS } from "./constants";

interface SessionState {
  unauthorized: boolean;
}

const defaultSessionState: SessionState = {
  unauthorized: false,
};

/**
 * Initializes the local storage with default session state.
 * This function sets a predefined default session state in local storage.
 */
export const initStorage = (): void => {
  localStorage.setItem(
    LOCAL_STORAGE_ITEMS.sessionState,
    JSON.stringify(defaultSessionState)
  );
};

/**
 * Retrieves an item from local storage.
 *
 * @param key - The key of the item to retrieve from local storage.
 * @returns The parsed JSON object from local storage or an empty object if the key doesn't exist.
 */
export const getItemStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

/**
 * Stores an item in local storage.
 *
 * @param key - The key under which to store the item.
 * @param objectValue - The object value to store, which will be stringified into JSON.
 */
export const setItemStorage = (key: string, objectValue: Object) => {
  localStorage.setItem(key, JSON.stringify(objectValue));
};

/**
 * Removes the session state from local storage.
 */
export const removeStateStorage = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_ITEMS.sessionState);
};

/**
 * Adds a listener to the storage event.
 *
 * @param callback - The function to be called when a storage event occurs.
 */
export const addStorageListener = (
  callback: EventListenerOrEventListenerObject
): void => {
  return window.addEventListener("storage", callback);
};

/**
 * Removes a listener from the storage event.
 *
 * @param callback - The function that was originally added as a storage event listener.
 */
export const removeStorageListener = (
  callback: EventListenerOrEventListenerObject
): void => {
  return window.removeEventListener("storage", callback);
};
