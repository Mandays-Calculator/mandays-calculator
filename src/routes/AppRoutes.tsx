import { RouteType } from ".";
import { ReactElement } from "react";

import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Title } from "~/components";

import { routesConfig } from ".";

const RouteWithTitle = ({ routeItem }: { routeItem: RouteType }) => {
  const { t } = useTranslation();
  return (
    <>
      {routeItem.pageTitle && typeof routeItem.pageTitle === "string" ? (
        <Title title={t(routeItem.pageTitle)} />
      ) : (
        routeItem.pageTitle
      )}
      {routeItem.element}
    </>
  );
};

const AppRoutes = (): ReactElement => {
  return (
    <Routes>
      {routesConfig.map((routeItem: RouteType, index: number) => (
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
