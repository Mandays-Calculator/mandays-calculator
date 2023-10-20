export type RealmConfigType = {
  url: string;
  realm: string;
  clientId: string;
};

export type ConfigType = {
  environment: string;
  rhsso: RealmConfigType;
};
