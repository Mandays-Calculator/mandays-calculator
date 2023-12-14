import type { ReactElement } from "react";
import _ from "lodash";

import ErrorPage from "~/pages/common/error-page";
import { useConfig } from "~/utils/env-config";

import { PageLoader } from "~/components";
import AuthenticatedApp from "~/AuthenticatedApp";

const App = (): ReactElement => {
  const environment = import.meta.env.VITE_ENVIRONMENT;
  const { config, loading } = useConfig(environment);

  if (!_.isNull(config)) {
    if (!_.isUndefined(config) && !loading) {
      return <AuthenticatedApp />;
    }
    return <PageLoader />;
  }
  return <ErrorPage type="configuration-error" />;
};

export default App;
