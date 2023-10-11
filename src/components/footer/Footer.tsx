import type { ReactElement } from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledFooterContainer = styled(Container)`
  position: absolute;
  bottom: 0;
  height: 60px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  padding: 22.5px 24px;
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

const Footer = (): ReactElement => {
  return (
    <StyledFooterContainer maxWidth="xl">
      <StyledFooterText variant="body2" color="text.secondary" align="center">
        &copy; {new Date().getFullYear()} Lenovo PCCW Solutions Philippines Inc.
        All rights reserved.
      </StyledFooterText>
    </StyledFooterContainer>
  );
};

export default Footer;
