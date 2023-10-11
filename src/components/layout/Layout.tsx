import type { ReactElement, PropsWithChildren } from "react";
import { Sidebar } from "~/components/sidebar";
import { Footer } from "~/components/footer";
import { StyledLayoutContainer, StyledLayoutContent } from ".";

const Layout = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <StyledLayoutContainer>
      <Sidebar />
      <StyledLayoutContent>{children}</StyledLayoutContent>
      <Footer />
    </StyledLayoutContainer>
  );
};

export default Layout;
