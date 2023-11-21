import { User } from "oidc-client-ts";
import { getEnvConfig } from "./env-config";
import { removeStateStorage } from "./storageHelper";
import { AuthContextProps } from "react-oidc-context";

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

export const logout = (auth: AuthContextProps, callback?: () => void) => {
  removeStateStorage();
  if (callback) {
    callback();
  }
  auth.removeUser();
};
