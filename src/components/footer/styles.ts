import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledFooterContainer = styled(Container)`
  position: absolute;
  bottom: 0;
  height: 60px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 22px 24px;
  margin: 0;
  text-align: center;
`;

const StyledFooterText = styled(Typography)`
  text-align: right;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  && {
    font-size: 12px;
  }
`;

export { StyledFooterContainer, StyledFooterText };
