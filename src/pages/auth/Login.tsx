import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Grid, Typography } from "@mui/material";

import Form from "~/components/form/Form";
import LocalizationKey from "~/i18n/key";
import theme from "~/theme";
import { CustomButton as Button } from "~/components/form/button";
import { ControlledTextField } from "~/components/form/controlled";
import { getFieldError } from "~/components/form/utils";

import PasswordInput from "./components/password-input/PasswordInput";
import { loginSchema } from "./schema";
import { StyledLabel, StyledTitle } from "./components/auth-container";

const Login = (): ReactElement => {
  const { t } = useTranslation();
  const auth = useAuth();

  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      await auth.signinResourceOwnerCredentials({
        username: values.username,
        password: values.password,
      });
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
            placeholder="Input username"
            name="username"
            helperText={getFieldError(loginForm.errors, "username")}
          />
        </Grid>
        <Grid item xs={12} pt={1} mb={3}>
          <StyledLabel>{t(LocalizationKey.login.label.password)}</StyledLabel>
          <PasswordInput
            placeholder="Input password"
            name="password"
            helperText={getFieldError(loginForm.errors, "password")}
          />
          <Link to={"/forgot-password"}>
            {t(LocalizationKey.login.label.forgotPassword)}
          </Link>
        </Grid>
        <Typography color={theme.palette.error.main}>
          {auth.error?.message}
        </Typography>
        <Grid item xs={12}>
          <Button fullWidth type="submit">
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default Login;
