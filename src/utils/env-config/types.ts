export type OIDCConfigType = {
  authority: string;
  realm: string;
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
};

export type IdleTimeoutConfig = {
  durationUntilPromptSeconds: number; // milliseconds
  confirmationWindowSeconds: number; // milliseconds
};

export type ConfigType = {
  environment: string;
  apiBasePath: string | ApiBasePath;
  enableAuth: boolean;
  oidcConfig: OIDCConfigType;
  idleTimeoutConfig: IdleTimeoutConfig;
};
