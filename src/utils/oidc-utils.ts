import { User } from "oidc-client-ts";

export const getUser = (): User | null => {
  const oidcStorage = localStorage.getItem(
    `oidc.user:<your authority>:<your client id>`
  );
  if (!oidcStorage) {
    return null;
  }
  return User.fromStorageString(oidcStorage);
};
