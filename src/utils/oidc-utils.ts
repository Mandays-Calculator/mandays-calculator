import { User } from "oidc-client-ts";

export const getUser = (): User | null => {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:http://localhost:8080/realms/mandays-calculator:mc-client`
  );
  if (!oidcStorage) {
    return null;
  }
  return User.fromStorageString(oidcStorage);
};
