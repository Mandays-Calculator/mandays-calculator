import type { ConfigType } from ".";

import { useState, useEffect } from "react";
import { initStorage } from "../storageHelper";

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

export const getEnvConfig = (key?: ApiBasePathParam): ConfigType => {
  return {
    ...(config as ConfigType),
    apiBasePath: getApiBasePath(key) as string,
  };
};

const getApiBasePath = (key?: ApiBasePathParam): string => {
  if (config && key) {
    return (config.apiBasePath as ApiBasePath)[key];
  }
  return (config?.apiBasePath as ApiBasePath).accountsService;
};

export const useConfig = (environment: string | undefined) => {
  const [config, setConfig] = useState<ConfigType | undefined>(undefined);

  useEffect(() => {
    if (environment) {
      loadConfig(environment).then((res: ConfigType | null) => {
        if (res) {
          setConfig(res);
          initStorage();
        }
      });
    }
  }, [environment]);

  return config;
};
