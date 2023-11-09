import type { ReactElement, ReactNode } from "react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import { Grid, ListItem, ListItemIcon } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import LocalizationKey from "~/i18n/key";
import Form from "~/components/form/Form";
import { CustomButton as Button } from "~/components/form/button";

import PasswordInput from "./components/password-input/PasswordInput";
import { StyledTitle, StyledLabel, AuthContainer } from "./components/auth-container";
import { changePasswordSchema } from "./schema";

const ValidationResult = ({ values }: any): ReactNode => {
  const { t } = useTranslation();
  const { changePassword } = LocalizationKey;
  return (
    <>
      <ListItem disablePadding={true}>
        <ListItemIcon>
          {values.password.length >= 8 ? (
            <CheckCircleIcon style={{ color: "green" }} data-testid="green-icon-password-length" />
          ) : (
            <CancelIcon style={{ color: "red" }} data-testid="red-icon-password-length" />
          )}
        </ListItemIcon>
        {t(changePassword.validationInfo.charCount)}
      </ListItem>
      <ListItem disablePadding={true}>
        <ListItemIcon>
          {/[A-Z]/.test(values.password) ? (
            <CheckCircleIcon style={{ color: "green" }} data-testid="green-icon-password-uppecase" />
          ) : (
            <CancelIcon style={{ color: "red" }} data-testid="red-icon-password-uppecase" />
          )}
        </ListItemIcon>
        {t(changePassword.validationInfo.uppercase)}
      </ListItem>
      <ListItem disablePadding={true}>
        <ListItemIcon>
          {/[a-z]/.test(values.password) ? (
            <CheckCircleIcon style={{ color: "green" }} data-testid="green-icon-password-lowercase" />
          ) : (
            <CancelIcon style={{ color: "red" }} data-testid="red-icon-password-lowercase" />
          )}
        </ListItemIcon>
        {t(changePassword.validationInfo.lowercase)}
      </ListItem>
      <ListItem disablePadding={true}>
        <ListItemIcon>
          {/[0-9]/.test(values.password) ? (
            <CheckCircleIcon style={{ color: "green" }} data-testid="green-icon-password-number" />
          ) : (
            <CancelIcon style={{ color: "red" }} data-testid="red-icon-password-number" />
          )}
        </ListItemIcon>
        {t(changePassword.validationInfo.number)}
      </ListItem>
      <ListItem disablePadding={true}>
        <ListItemIcon>
          {/(?=.*\W)/.test(values.password) ? (
            <CheckCircleIcon style={{ color: "green" }} data-testid="green-icon-password-symbol" />
          ) : (
            <CancelIcon style={{ color: "red" }} data-testid="red-icon-password-symbol" />
          )}
        </ListItemIcon>
        {t(changePassword.validationInfo.symbol)}
      </ListItem>
      <ListItem disablePadding={true}>
        <ListItemIcon>
          {values.password === values.confirmPassword &&
            values.password !== "" ? (
            <CheckCircleIcon style={{ color: "green" }} data-testid="green-icon-password-match" />
          ) : (
            <CancelIcon style={{ color: "red" }} data-testid="red-icon-password-match" />
          )}
        </ListItemIcon>
        {t(changePassword.validationInfo.match)}
      </ListItem>
    </>
  );
};

const ChangePassword = (): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { changePassword } = LocalizationKey;
  const changePasswordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    validateOnChange: true,
    onSubmit: () => { },
  });

  const goBack = (): void => {
    navigate(-1);
  };

  const { values } = changePasswordForm;
  return (
    <AuthContainer>
      <Form instance={changePasswordForm}>
        <StyledTitle>{t(changePassword.label.createNewPassword)}</StyledTitle>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <StyledLabel>{t(changePassword.label.enterNewPassword)}</StyledLabel>
            <PasswordInput name="password" placeholder="Input Password" />
          </Grid>
          <Grid item xs={12}>
            <StyledLabel>{t(changePassword.label.confirmNewPassword)}</StyledLabel>
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <ValidationResult values={values} />
          </Grid>
          <Grid item xs={6} mt={3} padding="10px">
            <Button fullWidth colorVariant="primaryLight" onClick={goBack}>
              {t(changePassword.btnlabel.cancel)}
            </Button>
          </Grid>
          <Grid item xs={6} mt={3} padding="10px">
            <Button type="submit" fullWidth>
              {t(changePassword.btnlabel.changePassword)}
            </Button>
          </Grid>

        </Grid>
      </Form>
    </AuthContainer>
  );
};

export default ChangePassword;
