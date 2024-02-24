import type { RouteType } from ".";
import { ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { authRoutes, Auth } from "~/pages/auth";

import RouteWithTitle from "./RouteWithTitle";
import { getPermittedRoute, seperateRoutesByType } from "./utils";
import { Permission } from "~/api/user";

const AppRoutes = ({
  isAuthenticated,
  rolePermissions = [],
}: {
  isAuthenticated: boolean;
  rolePermissions?: Permission[];
}): ReactElement => {
  const permissions = rolePermissions.map((role) =>
    role.path.replace(/^\//, ""),
  );
  const publicRoutes = seperateRoutesByType("public");
  const privateRoutes = seperateRoutesByType("private");
  const errorHandlerRoutes = seperateRoutesByType("error");

  const permittedRoutes = getPermittedRoute(permissions, privateRoutes);
  const routes = isAuthenticated
    ? [
        ...permittedRoutes,
        ...publicRoutes,
        ...errorHandlerRoutes,
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
