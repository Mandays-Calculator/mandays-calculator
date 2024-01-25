import { Grid, Typography, styled } from "@mui/material";

export const StyledNoDataFoundLabel = styled(Typography)`
  text-align: center;
  margin: 0 auto;
  padding: 20px;
`;

export const CardInfoContainer = styled("div")`
  margin-left: 10px;
`;

export const CardContainer = styled(Grid)`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 7px;
  padding: 0.4rem;
  cursor: pointer;
  background-color: ${({ selected }: { selected: boolean }) =>
    !selected ? "" : "#ecebeb"};
`;
