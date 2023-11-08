import { User } from "oidc-client-ts";
import { getEnvConfig } from "./env-config";

export const getUser = (): User | null => {
  const { sessionStorageOidcKey } = getEnvConfig();
  const oidcStorage = sessionStorage.getItem(sessionStorageOidcKey);
  if (!oidcStorage) {
    return null;
  }
  return User.fromStorageString(oidcStorage);
};
