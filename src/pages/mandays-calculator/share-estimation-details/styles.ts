import { styled } from "@mui/material/styles";

export const StyledContainer = styled("div")`
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.light};
`;

export const StyledImageContainer = styled("div")`
  width: 80%;
  height: auto;
  margin: 0 auto;

  img {
    width: 100%;
    height: auto;
  }
`;
