import type { RouteType } from ".";
import { routesConfig, errorRoutes } from ".";
import _ from "lodash";
import ErrorPage from "~/pages/common/error-page/ErrorPage";

type RouteTypeParam = "public" | "private" | "error";

export const seperateRoutesByType = (type: RouteTypeParam): RouteType[] => {
  if (type === "error") {
    return errorRoutes;
  }
  if (type === "public") {
    return routesConfig.filter(
      (routeItem: RouteType) =>
        !_.isUndefined(routeItem.protected) && routeItem.protected === false,
    );
  }
  return routesConfig.filter(
    (routeItem: RouteType) =>
      _.isUndefined(routeItem.protected) || routeItem.protected === true,
  );
};
export const getPermittedRoute = (
  permittedPaths: string[],
  privateRoutes: RouteType[],
): RouteType[] => {
  return privateRoutes.map((privRoute: RouteType) => {
    const isPermitted = permittedPaths.some(
      (permittedPath) =>
        (privRoute.path && privRoute.path.startsWith(`${permittedPath}/`)) ||
        privRoute.path === permittedPath ||
        privRoute.disabledPermissionChecking === true,
    );

    if (!isPermitted) {
      return {
        ...privRoute,
        element: <ErrorPage type="permission-denied" />,
      };
    }
    return privRoute;
  });
};
