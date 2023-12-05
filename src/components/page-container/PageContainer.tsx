import type { ReactElement } from "react";
import type { ContainerProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

const StyledContainer = styled(Container)(({ theme }) => ({
  borderRadius: 16,
  padding: 32,
  marginTop: 24,
  background: theme.palette.background.paper,
  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
}));

type PageContainerProps = ContainerProps;

const PageContainer = (props: PageContainerProps): ReactElement => {
  return <StyledContainer {...props} maxWidth={false} />;
};

export default PageContainer;
