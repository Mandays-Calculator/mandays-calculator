import { Typography, styled } from "@mui/material";
import { PageContainer } from "~/components";

export const StyledTitle = styled(Typography)(() => ({
  fontSize: "1.5rem",
  fontWeight: 600,
}));

export const StyledContainer = styled(PageContainer)`
  background: transparent;
  box-shadow: none;
`;
