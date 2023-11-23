import { RouteType } from ".";
import { ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { authRoutes, Auth } from "~/pages/auth";

import RouteWithTitle from "./RouteWithTitle";
import { seperateRoutesByType } from "./utils";

const AppRoutes = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}): ReactElement => {
  const publicRoutes = seperateRoutesByType("public");
  const privateRoutes = seperateRoutesByType("private");

  const routes = isAuthenticated
    ? [
        ...privateRoutes,
        ...publicRoutes,
        ...authRoutes.map((routeItem: RouteType) => ({
          ...routeItem,
          element: <Navigate to="/" />,
        })),
      ]
    : [
        ...publicRoutes,
        ...authRoutes.map((routeItem: RouteType) => ({
          ...routeItem,
          element: <Auth>{routeItem.element}</Auth>,
        })),
      ];

  console.log("running");
  return (
    <Routes>
      {routes.map((routeItem: RouteType, index: number) => (
        <Route
          path={routeItem.path}
          element={<RouteWithTitle routeItem={routeItem} />}
          key={index}
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
