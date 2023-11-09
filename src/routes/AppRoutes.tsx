import type { RouteType } from ".";

import { Routes, Route } from "react-router-dom";
import { routesConfig } from ".";

const AppRoutes = () => {
  return (
    <Routes>
      {routesConfig.map((routeItem: RouteType, index: number) => (
        <Route path={routeItem.path} element={routeItem.element} key={index} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
