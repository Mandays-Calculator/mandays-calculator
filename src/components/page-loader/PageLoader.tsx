import type { ReactElement } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const StyledContainer = styled(Box)({
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  height: "90vh",
});

export const PageLoader = (): ReactElement => {
  return (
    <StyledContainer>
      <CircularProgress aria-label="loading..." />
    </StyledContainer>
  );
};

export default PageLoader;
