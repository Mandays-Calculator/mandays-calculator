import type { PropsWithChildren, ReactElement } from "react";

import { Footer } from "~/components/footer";
import { AuthContainer } from "./components/auth-container";
import { Alert } from "~/components";
import { useUserAuth } from "~/hooks/user";

const Auth = (props: PropsWithChildren): ReactElement => {
  const { children } = props;
  const {
    state: { isLogoutError },
  } = useUserAuth();
  return (
    <>
      <AuthContainer>{children}</AuthContainer>
      <Footer />
      <Alert
        duration={3000}
        open={isLogoutError || false}
        title="Logout"
        message="There is an error performing logout"
      />
    </>
  );
};

export default Auth;
