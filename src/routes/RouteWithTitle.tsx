import type { RouteType } from ".";

import { useTranslation } from "react-i18next";
import { Title } from "~/components";

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

export default RouteWithTitle;
