import type { ReactElement } from "react";
import type { ContainerProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

const StyledContainer = styled(Container)(({ theme }) => ({
  borderRadius: 16,
  padding: 32,
  background: theme.palette.background.paper,
  boxShadow: "0 8px 6px -6px rgba(0, 0, 0, 0.4)",
}));

type PageContainerProps = ContainerProps;

const PageContainer = (props: PageContainerProps): ReactElement => {
  return <StyledContainer {...props} maxWidth="xl" />;
};

export default PageContainer;
