import type { PropsWithChildren, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { Footer } from "~/components/footer";
import { AuthContainer } from "./components/auth-container";
import { Alert } from "~/components";
import { useUserAuth } from "~/hooks/user";
import LocalizationKey from "~/i18n/key";

const Auth = (props: PropsWithChildren): ReactElement => {
  const { t } = useTranslation();
  const { children } = props;

  const {
    state: { isLogoutError },
  } = useUserAuth();

  const { common } = LocalizationKey;
  return (
    <>
      <AuthContainer>{children}</AuthContainer>
      <Footer />
      <Alert
        duration={3000}
        open={isLogoutError || false}
        title={t(common.logout)}
        message={t(common.logoutErrorLabel)}
      />
    </>
  );
};

export default Auth;
