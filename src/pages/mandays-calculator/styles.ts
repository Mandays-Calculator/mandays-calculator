import { Typography, styled } from "@mui/material";

export const StyledSprintLabel = styled(Typography)`
  font-size: 1.1rem;
  margin-bottom: 25px;
  font-weight: 700;
`;

export const StyledTeamLabel = styled(Typography)`
  min-width: 200px;
  text-align: center;
  font-size: 1.3rem;
`;

export const StyledResourceCellContainer = styled("div")`
  max-width: 200px;
  text-align: ${({ isInput }: { isInput: boolean }) =>
    isInput ? "center" : "left"};
`;

export const StyledEstimationResourceTableContainer = styled("div", {
  shouldForwardProp: (propName: string) => !propName.startsWith("$"),
})(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("xl")]: {
    width: "350px",
  },
}));

export const SubColumnNumInputContainer = styled("div")`
  width: 120px;

  & .MuiTypography-root {
    font-size: 0.8rem;
    margin: 0;
  }
`;
