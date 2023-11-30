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

interface ConfigResponse {
  config: ConfigType | undefined | null;
  loading: boolean;
}

export const useConfig = (environment: string | undefined): ConfigResponse => {
  const [config, setConfig] = useState<ConfigType | undefined | null>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    if (!environment) {
      setConfig(null);
    } else {
      loadConfig(environment)
        .then((res: ConfigType | null) => {
          if (res) {
            setConfig(res);
            initStorage();
          }
        })
        .catch((e: Error) => {
          console.log("Error in loading config: ", e);
          setConfig(null);
        });
    }
    setLoading(false);
  }, [environment]);

  return { config, loading };
};
