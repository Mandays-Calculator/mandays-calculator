import { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Grid } from "@mui/material";

import LocalizationKey from "~/i18n/key";
import Form from "~/components/form/Form";
import { CustomButton as Button } from "~/components/form/button";
import { ControlledTextField } from "~/components/form/controlled";
import { getFieldError } from "~/components/form/utils";

import { StyledLabel } from "./components/auth-container";
import { forgotPasswordSchema } from "./schema";

const ForgotPassword = (): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { forgotPassword } = LocalizationKey;

  const forgotPasswordForm = useFormik({
    initialValues: {
      usernameOrEmail: "",
    },
    validationSchema: forgotPasswordSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      navigate("../change-password", {
        state: {
          usernameOrEmail: values.usernameOrEmail,
        },
      });
    },
  });

  return (
    <Form instance={forgotPasswordForm}>
      <Grid container>
        <Grid item xs={12}>
          <StyledLabel textAlign="center">
            {t(forgotPassword.labelInfo.enterUsername)} <br />{t(forgotPassword.labelInfo.link)}
          </StyledLabel>
        </Grid>
        <Grid item xs={12} mt={2} mb={1}>
          <ControlledTextField
            fullWidth
            placeholder="Input Username or Email"
            name="usernameOrEmail"
            helperText={getFieldError(
              forgotPasswordForm.errors,
              "usernameOrEmail"
            )}
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <Link to={"/"}>
            {t(forgotPassword.btnlabel.back)}
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth type="submit">
            {t(forgotPassword.btnlabel.send)}
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ForgotPassword;
