import { Navigate } from "react-router-dom";
import type { RouteType } from ".";
import { routesConfig } from ".";
import _ from "lodash";

type RouteTypeParam = "public" | "private";

export const seperateRoutesByType = (type: RouteTypeParam): RouteType[] => {
  if (type === "public") {
    return routesConfig.filter(
      (routeItem: RouteType) =>
        !_.isUndefined(routeItem.protected) && routeItem.protected === false
    );
  }
  return routesConfig.filter(
    (routeItem: RouteType) =>
      _.isUndefined(routeItem.protected) || routeItem.protected === true
  );
};

export const getPermittedRoute = (
  permittedPath: string[],
  privateRoutes: RouteType[]
): RouteType[] => {
  return privateRoutes.map((privRoute: RouteType) => {
    console.log(privRoute, "private route", permittedPath);
    if (privRoute.path && !permittedPath.includes(privRoute.path)) {
      return {
        ...privRoute,
        element: <Navigate to="/permission-denied" />,
      };
    }
    return privRoute;
  });
};
