import type { ReactElement } from "react";
import type { RootState, AppDispatch } from "~/redux/store";
import type { LoginState } from "~/redux/reducers/login/types";
import { styled } from "@mui/material/styles";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Container, Box } from "@mui/material";
import { loginUser } from "~/redux/reducers/login";
import LocalizationKey from "~/i18n/key";

const Login = (): ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const { login } = LocalizationKey;
  const loginState: LoginState = useSelector((state: RootState) => state.login);
  const { t } = useTranslation();

  const onLogin = (): void => {
    dispatch(loginUser());
  };

  console.log(login, loginState, t, onLogin);
  const StyledAuthContainer = styled(Container)(({ theme }) => ({
    height: "100%",
    background: theme.palette.primary.light,
  }));

  const StyledLoginContainer = () => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh" // Adjust the height as needed
      >
        <Box width="900px" height="600px">
          {/* Content */}
          LOGIN
        </Box>
      </Box>
    );
  };

  return (
    <StyledAuthContainer disableGutters maxWidth={false}>
      <StyledLoginContainer />
    </StyledAuthContainer>
  );
};

export default Login;
