import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";

import LocalizationKey from "~/i18n/key";
import { Grid } from "@mui/material";
import { useFormik } from "formik";

import ErrorMessage from "~/components/form/error-message/ErrorMessage";
import { ControlledTextField } from "~/components/form/controlled";
import { CustomButton as Button } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";
import Form from "~/components/form/Form";
import { UserPermissionState, login, selectUser } from "~/redux/reducers/user";

import { StyledLabel, StyledTitle } from "./components/auth-container";
import PasswordInput from "./components/password-input/PasswordInput";
import { loginSchema } from "./schema";
import { AppDispatch } from "~/redux/store";
import { useErrorHandler } from "~/hooks/error-handler";

const Login = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const userState: UserPermissionState = useSelector(selectUser);

  const { loading, error } = userState;

  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema(t),
    validateOnChange: false,
    onSubmit: async (values) => {
      dispatch(
        login({
          username: values.username,
          password: values.password,
          callbacks: {
            onSuccess: () => {
              console.log("Login succeed");
            },
          },
        })
      );
    },
  });

  return (
    <Form instance={loginForm}>
      <Grid container>
        <StyledTitle>{t(LocalizationKey.login.label.signIn)}</StyledTitle>
        <Grid item xs={12}>
          <StyledLabel>{t(LocalizationKey.login.label.userName)}</StyledLabel>
          <ControlledTextField
            fullWidth
            placeholder={t(LocalizationKey.login.placeholder.userName)}
            name="username"
            helperText={getFieldError(loginForm.errors, "username")}
          />
        </Grid>
        <Grid item xs={12} pt={1} mb={3}>
          <StyledLabel>{t(LocalizationKey.login.label.password)}</StyledLabel>
          <PasswordInput
            placeholder={t(LocalizationKey.login.placeholder.password)}
            name="password"
            helperText={getFieldError(loginForm.errors, "password")}
          />
          <Link to={"/forgot-password"}>
            {t(LocalizationKey.login.label.forgotPassword)}
          </Link>
        </Grid>
        {error !== null && <ErrorMessage error={useErrorHandler(error, t)} />}
        <Grid item xs={12}>
          <Button fullWidth type="submit">
            {loading
              ? t(LocalizationKey.common.userManagement.authSignInLoading)
              : t(LocalizationKey.login.btnlabel.signIn)}
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default Login;
