import { Typography, AppBar } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledFooter = styled(AppBar)`
  position: absolute;
  bottom: 0;
  max-height: ${({ theme }) => theme.spacing(7.6)};
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: ${({ theme }) => theme.spacing(2.6, 3)};
  text-align: center;
`;

const StyledFooterText = styled(Typography)`
  text-align: right;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  && {
    font-size: 0.8rem;
  }
`;

export { StyledFooter, StyledFooterText };
