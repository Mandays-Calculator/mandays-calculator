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
