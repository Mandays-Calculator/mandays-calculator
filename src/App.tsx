import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Auth } from "./pages/auth";
import AuthenticatedApp from "./AuthenticatedApp";
import { loadConfig, ConfigType } from "./utils/env-config";

const App = (): ReactElement => {
  const [config, setConfig] = useState<ConfigType | null>(null);

  useEffect(() => {
    loadConfig().then((res: ConfigType | null) => {
      setConfig(res);
    });
  }, []);

  console.log(config, "config check");
  const isAuthenticated = true;

  return <>{isAuthenticated ? <AuthenticatedApp /> : <Auth />}</>;
};

export default App;
