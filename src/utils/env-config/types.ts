export type IdleTimeoutConfig = {
  durationUntilPromptSeconds: number; // milliseconds
  confirmationWindowSeconds: number; // milliseconds
};

export type ConfigType = {
  environment: string;
  apiBasePath: string | ApiBasePath;
  enableAuth: boolean;
  idleTimeoutConfig: IdleTimeoutConfig;
  encryptData: boolean;
};
