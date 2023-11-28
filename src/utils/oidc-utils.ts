import { User } from "oidc-client-ts";
import { getEnvConfig } from "./env-config";
import { removeStateStorage } from "./storageHelper";
import { AuthContextProps } from "react-oidc-context";

/**
 * Retrieves the user data from session storage, if available.
 * @returns User object or null if no user data is stored.
 */
export const getUser = (): User | null => {
  const {
    oidcConfig: { authority, client_id },
  } = getEnvConfig();
  const sessionStorageOidcKey = `oidc.user:${authority}:${client_id}`;
  const oidcStorage = sessionStorage.getItem(sessionStorageOidcKey);
  if (!oidcStorage) {
    return null;
  }
  return User.fromStorageString(oidcStorage);
};

/**
 * Logs out the current user and performs clean-up.
 * @param auth Authentication context.
 * @param callback Optional callback function to execute after logout.
 */
export const logout = (auth: AuthContextProps, callback?: () => void) => {
  removeStateStorage();
  if (callback) {
    callback();
  }
  auth.removeUser();
};
