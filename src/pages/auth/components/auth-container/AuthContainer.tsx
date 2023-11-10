import type { ReactElement, ReactNode } from "react";
import { Grid } from "@mui/material";

import LoginIcon from "~/assets/svg/login-icon.svg";
import {
  StyledAuthContainer,
  StyledContainer,
  StyledImageContainer,
  StyledGrid,
  AuthImageContainer,
} from ".";

type AuthContainerProps = {
  children?: ReactNode;
};

const AuthContainer = ({ children }: AuthContainerProps): ReactElement => {
  return (
    <StyledAuthContainer>
      <StyledContainer>
        <Grid container alignItems="center" justifyContent="center">
          <AuthImageContainer item xs={3.75}>
            <StyledImageContainer>
              <img src={LoginIcon} alt="login" width={"100%"} height={"auto"} />
            </StyledImageContainer>
          </AuthImageContainer>
          <StyledGrid item xs={6}>
            {children}
          </StyledGrid>
        </Grid>
      </StyledContainer>
    </StyledAuthContainer>
  );
};

export default AuthContainer;
