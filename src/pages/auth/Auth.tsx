import type { PropsWithChildren, ReactElement } from "react";

import { Footer } from "~/components/footer";
import { AuthContainer } from "./components/auth-container";

const Auth = (props: PropsWithChildren): ReactElement => {
  const { children } = props;
  return (
    <>
      <AuthContainer>{children}</AuthContainer>
      <Footer />
    </>
  );
};

export default Auth;
