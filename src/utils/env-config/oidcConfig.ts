import type { OIDCConfigType } from "~/utils/env-config";

export const OIDCConfig: OIDCConfigType = {
  authority: "http://localhost:8080/auth/realms/mandays-calculator",
  realm: "mandays-calculator",
  client_id: "mc-client",
  redirect_uri: window.location.origin,
  response_type: "code",
  scope: "openid profile",
};
