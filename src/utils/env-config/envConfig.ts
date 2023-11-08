import { ConfigType } from ".";

let config: ConfigType | null = null;

export const loadConfig = async (env: string): Promise<ConfigType | null> => {
  return await fetch(`/config/config-${env}.json`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((configRes: ConfigType) => {
      if (configRes !== null) {
        config = {
          ...configRes,
        };
        return configRes;
      }
      return config;
    });
};

export const getEnvConfig = (): ConfigType => {
  return config as ConfigType;
};
