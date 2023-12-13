import { ReactElement, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import { Grid, Typography } from "@mui/material";

import { CustomButton as Button } from "~/components/form/button";
import Form from "~/components/form/Form";
import { useResetPasswordMutation } from "~/mutations/auth";
import LocalizationKey from "~/i18n/key";

import { tryDecodeURIComponent } from "~/utils/helpers/decodeURI";

import PasswordInput from "./components/password-input/PasswordInput";
import { StyledTitle, StyledLabel } from "./components/auth-container";
import ValidationResult from "./components/validation-result/ValidationResult";

import { changePasswordSchema } from "./schema";
import { useRequestHandler } from "~/hooks/request-handler";
import { useErrorHandler } from "~/hooks/error-handler";
import { ErrorMessage } from "~/components";
import CustomCheckIcon from "./components/check-icon/CheckIcon";

const ChangePassword = (): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const codeParam = searchParams.get("code");
  const decodedCode = codeParam ? tryDecodeURIComponent(codeParam) : "";

  const resetPassMutation = useResetPasswordMutation();
  const [status, callApi] = useRequestHandler(resetPassMutation.mutate);

  useEffect(() => {
    if (!codeParam) {
      navigate("./login");
    }
  }, [searchParams]);

  const { changePassword } = LocalizationKey;
  const changePasswordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema(t),
    validateOnChange: true,
    onSubmit: ({ confirmPassword }) => {
      callApi({ code: decodedCode, newPassword: confirmPassword });
    },
  });

  const goBack = (): void => {
    navigate("./login");
  };

  const { values } = changePasswordForm;
  return (
    <>
      {status.success ? (
        <Grid container>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <CustomCheckIcon>
              <Typography variant="h6" fontWeight="bold" textAlign={"justify"}>
                {t(LocalizationKey.changePassword.label.title)}
              </Typography>
            </CustomCheckIcon>
          </Grid>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Typography variant="body1" textAlign={"justify"}>
              {t(LocalizationKey.changePassword.label.success)}
            </Typography>
          </Grid>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(window.origin);
            }}
          >
            {t(LocalizationKey.login.btnlabel.signIn)}
          </Button>
        </Grid>
      ) : (
        <Form instance={changePasswordForm}>
          <StyledTitle>{t(changePassword.label.createNewPassword)}</StyledTitle>
          <Grid container mt={4}>
            <Grid item xs={12} mb={2}>
              <StyledLabel>
                {t(changePassword.label.enterNewPassword)}
              </StyledLabel>
              <PasswordInput
                name="password"
                placeholder={t(changePassword.placeholder.password)}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledLabel>
                {t(changePassword.label.confirmNewPassword)}
              </StyledLabel>
              <PasswordInput
                name="confirmPassword"
                placeholder={t(changePassword.placeholder.confirmPassword)}
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              {!status.loading && (
                <ErrorMessage error={useErrorHandler(status.error, t)} />
              )}
              <ValidationResult values={values} />
            </Grid>
            <Grid item xs={6} mt={3} p={2}>
              <Button fullWidth colorVariant="primaryLight" onClick={goBack}>
                {t(changePassword.btnlabel.cancel)}
              </Button>
            </Grid>
            <Grid item xs={6} mt={3} p={2}>
              <Button type="submit" fullWidth>
                {t(changePassword.btnlabel.changePassword)}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </>
  );
};

export default ChangePassword;
