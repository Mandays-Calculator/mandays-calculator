import { LoginResponse } from "~/api/auth";
import { SESSION_STORAGE_ITEMS } from "./constants";

type STORAGE = "local" | "session" | undefined;
/**
 * Retrieves an item from local storage.
 *
 * @param key - The key of the item to retrieve from local storage.
 * @returns The parsed JSON object from local storage or an empty object if the key doesn't exist.
 */
export const getItemStorage = (key: string, type: STORAGE = "local"): any => {
  if (type === "local") {
    return JSON.parse(localStorage.getItem(key) || "{}");
  }
  return JSON.parse(sessionStorage.getItem(key) || "{}");
};

/**
 * Removes the session state from local storage.
 */
export const removeStateStorage = (
  type: STORAGE = "local",
  items: string[] = []
): void => {
  if (type === "session") {
    [...items, SESSION_STORAGE_ITEMS.mcUser].map((item: string) =>
      sessionStorage.removeItem(item)
    );
  }
  if (type === "local")
    [[...items].map((item: string) => localStorage.removeItem(item))];
};

/**
 * Stores an item in local storage.
 *
 * @param key - The key under which to store the item.
 * @param objectValue - The object value to store, which will be stringified into JSON.
 * @param type - Accepts whether store in local storage or session storage.
 */
export const setItemStorage = (
  key: string,
  objectValue: Object,
  type: STORAGE = "local"
) => {
  if (type === "local") {
    localStorage.setItem(key, JSON.stringify(objectValue));
  }
  if (type === "session") {
    sessionStorage.setItem(key, JSON.stringify(objectValue));
  }
};

export const getUser = (): LoginResponse | null => {
  const user = getItemStorage(SESSION_STORAGE_ITEMS.mcUser, "session");
  if (Object.keys(user).length > 0) {
    return user as LoginResponse;
  }
  return null;
};
