import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";

const Login = (): ReactElement => {
  const { t } = useTranslation();

  return <div>{t("login.management")}</div>;
};

export default Login;
