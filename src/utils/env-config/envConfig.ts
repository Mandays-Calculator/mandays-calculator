import { ConfigType } from ".";

let config: ConfigType | null = null;

export const loadConfig = async (): Promise<ConfigType | null> => {
  return await fetch(`config/config.json`, {
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
