import type { RouteType } from ".";

import { Routes, Route } from "react-router-dom";
import { routesConfig } from ".";

const AppRoutes = () => {
  return (
    <Routes>
      {routesConfig.map((routeItem: RouteType) => (
        <Route path={routeItem.path} element={routeItem.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
