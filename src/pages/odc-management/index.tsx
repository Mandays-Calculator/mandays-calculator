import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";

const ODCManagement = (): ReactElement => {
  const { t } = useTranslation();

  return <div>{t("odc.management")}</div>;
};

export default ODCManagement;
