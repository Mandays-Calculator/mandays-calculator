import type { ReactElement, PropsWithChildren } from "react";
import { Sidebar } from "~/components/sidebar";
import { Footer } from "~/components/footer";
import Header from "../header/Header";
import {
  StyledLayoutContainer,
  StyledLayoutContent,
  ContentContainer,
} from ".";

const Layout = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <>
      <StyledLayoutContainer id="layout-container">
        <Sidebar />
        <StyledLayoutContent>
          <Header />
          <ContentContainer>{children}</ContentContainer>
        </StyledLayoutContent>
        <Footer />
      </StyledLayoutContainer>
    </>
  );
};

export default Layout;
