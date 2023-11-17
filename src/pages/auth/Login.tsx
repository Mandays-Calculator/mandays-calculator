import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router-dom";
import { ReactElement } from "react";

import LocalizationKey from "~/i18n/key";
import { Grid } from "@mui/material";
import { useFormik } from "formik";

import ErrorMessage from "~/components/form/error-message/ErrorMessage";
import { ControlledTextField } from "~/components/form/controlled";
import { CustomButton as Button } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";
import Form from "~/components/form/Form";

import { StyledLabel, StyledTitle } from "./components/auth-container";
import PasswordInput from "./components/password-input/PasswordInput";
import { loginSchema } from "./schema";

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
        <ErrorMessage error={auth.error?.message} />
        <Grid item xs={12}>
          <Button fullWidth type="submit">
            {t(LocalizationKey.login.btnlabel.signIn)}
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default Login;
