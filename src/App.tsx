import type { ReactElement } from "react";
import type { ConfigType } from "~/utils/env-config";

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { loadConfig } from "~/utils/env-config";
import KeycloakApp from "~/KeycloakApp";

const App = (): ReactElement => {
  const [config, setConfig] = useState<ConfigType | undefined>(undefined);

  useEffect(() => {
    loadConfig().then((res: ConfigType | null) => {
      if (res) {
        setConfig(res);
      }
    });
  }, []);

  return (
    <>
      {config ? (
        <KeycloakApp />
      ) : (
        // Will be replace by loader component
        <Typography
          variant="h1"
          justifyContent="center"
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="100vh"
        >
          Loading ..
        </Typography>
      )}
    </>
  );
};

export default App;
