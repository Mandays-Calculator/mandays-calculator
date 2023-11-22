import { Link, useNavigate } from "react-router-dom";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";

import LocalizationKey from "~/i18n/key";
import { Grid } from "@mui/material";
import { useFormik } from "formik";

import { ControlledTextField } from "~/components/form/controlled";
import { CustomButton as Button } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";
import Form from "~/components/form/Form";

import { forgotPasswordAPI } from "~/api/auth/Auth";

import { StyledLabel } from "./components/auth-container";
import { forgotPasswordSchema } from "./schema";

const ForgotPassword = (): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { forgotPassword } = LocalizationKey;

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: { usernameOrEmail: string; }) => {
    try {
      setIsLoading(true);

      const response = await forgotPasswordAPI(values.usernameOrEmail);

      if (response.data.success) {
        navigate("../change-password", {
          state: {
            usernameOrEmail: values.usernameOrEmail,
          },
        });
      } else {
        console.error("API call failed:", response.data.error);
      }
    } catch (error) {
      console.error("An error occurred during the API call:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPasswordForm = useFormik({
    initialValues: {
      usernameOrEmail: "",
    },
    validationSchema: forgotPasswordSchema,
    validateOnChange: false,
    onSubmit,
  });

  return (
    <Form instance={forgotPasswordForm}>
      <Grid container>
        <Grid item xs={12}>
          <StyledLabel textAlign="center">
            {t(forgotPassword.label.enterUsername)} <br />
            {t(forgotPassword.label.link)}
          </StyledLabel>
        </Grid>
        <Grid item xs={12} mt={2} mb={1}>
          <ControlledTextField
            fullWidth
            placeholder={t(forgotPassword.placeholder)}
            name="usernameOrEmail"
            helperText={getFieldError(
              forgotPasswordForm.errors,
              "usernameOrEmail"
            )}
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <Link to={"/"}>{t(forgotPassword.btnlabel.back)}</Link>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth type="submit" disabled={isLoading}>
            {isLoading ? t("Sending...") : t(forgotPassword.btnlabel.send)}
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ForgotPassword;
