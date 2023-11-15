import { useEffect, type ReactElement } from "react";

import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "90vh",
  gap: "20px",
});

export const PageLoader = (props: { labelOnLoad?: string }): ReactElement => {
  const { labelOnLoad } = props;

  useEffect(() => {
    const layoutContainer = document.getElementById("layout-container");
    if (layoutContainer) {
      const originalOverflow = layoutContainer.style.overflow;
      layoutContainer.style.overflow = "hidden";
      return () => {
        layoutContainer.style.overflow = originalOverflow;
      };
    }
  }, []);

  return (
    <StyledContainer>
      <CircularProgress aria-label="loading..." />
      {labelOnLoad && (
        <Typography variant="subtitle1">{labelOnLoad}</Typography>
      )}
    </StyledContainer>
  );
};

export default PageLoader;
