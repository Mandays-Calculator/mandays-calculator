import type { ReactElement } from "react";
import type { ContainerProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(0, 0, 10, 0),
}));

type PageContainerProps = ContainerProps;

const PageContainer = (props: PageContainerProps): ReactElement => {
  return <StyledContainer {...props} maxWidth="xl" />;
};

export default PageContainer;
