import type { ReactElement } from "react";
import type { RootState, AppDispatch } from "~/redux/store";
import type { LoginState } from "~/redux/reducers/login/types";
// import { styled } from "@mui/material/styles";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Container, Box } from "@mui/material";
import { loginUser } from "~/redux/reducers/login";
import { Footer } from "~/components/footer";
import Form from "~/components/form/Form";
import Grid from "@mui/material/Grid";
import LocalizationKey from "~/i18n/key";
import LoginIcon from "~/assets/svg/login-icon.svg";
import { useFormik } from "formik";
import { ControlledTextField } from "~/components/form/controlled";
import styled from "@emotion/styled";

const Login = (): ReactElement => {
  console.log("rendering");
  const dispatch: AppDispatch = useDispatch();

  const { login } = LocalizationKey;
  const loginState: LoginState = useSelector((state: RootState) => state.login);
  const { t } = useTranslation();

  const onLogin = (): void => {
    dispatch(loginUser);
  };

  const StyledAuthContainer = styled("div")(({ theme }) => ({
    height: "100%",
    background: theme.palette.primary.light,
  }));

  const loginForm = useFormik<{
    username: string;
    password: string;
  }>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => console.log("values", values),
  });

  const StyledContainer = styled(Container)`
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    height: 100vh;
    align-self: stretch;
  `;

  return (
    // // <StyledAuthContainer disableGutters maxWidth={false}>
    // <StyledAuthContainer
    // // sx={{
    // //   background: theme.palette.primary.light,
    // // }}
    // >
    <StyledContainer>
      <Grid container>
        <Grid
          item
          xs={4}
          style={{
            height: "600px",
            position: "relative",
            borderRadius: "30px 0px 0px 30px",
            background: "#1AA9E8",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "-124px",
              right: "-32px",
              top: "44px",
              width: "556px",
              height: "509px",
            }}
          >
            <img src={LoginIcon} alt="login" width="556px" height="556px" />
          </div>
        </Grid>
        <Grid
          item
          xs={7}
          style={{
            background: "#FEFEFE",
            display: "flex",
            width: "500px",
            padding: "68px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "20px",
            flexShrink: 0,
            alignSelf: "stretch",
            borderRadius: "0px 30px 30px 0px",
          }}
        >
          <Form instance={loginForm}>
            <Grid container>
              <Grid item xs={12}>
                <ControlledTextField name="username" key="username" />
              </Grid>
              <Grid item xs={12}>
                <ControlledTextField name="password" key="password" />
              </Grid>
            </Grid>
          </Form>
        </Grid>
      </Grid>
    </StyledContainer>
    // </StyledAuthContainer>
  );
};

export default Login;
