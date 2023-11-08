export type OIDCConfigType = {
  authority: string;
  realm: string;
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
};

export type ConfigType = {
  environment: string;
  apiBasePath: string;
  enableAuth: boolean;
  oidcConfig: OIDCConfigType;
  sessionStorageOidcKey: string;
};
