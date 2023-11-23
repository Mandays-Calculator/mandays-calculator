import { Link, useNavigate } from "react-router-dom";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";

import LocalizationKey from "~/i18n/key";
import { Grid, Typography } from "@mui/material";
import { useFormik } from "formik";

import { ControlledTextField } from "~/components/form/controlled";
import { CustomButton as Button } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";
import Form from "~/components/form/Form";

import { StyledLabel } from "./components/auth-container";
import { forgotPasswordSchema } from "./schema";
import { useForgotPasswordMutation } from "~/queries/auth";
import { ErrorMessage } from "~/components";

const ForgotPassword = (): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { forgotPassword } = LocalizationKey;

  const [status, setStatus] = useState<{
    loading: boolean;
    error: string;
    success: boolean;
  }>({
    loading: false,
    error: "",
    success: false,
  });

  const forgotPasswordMutation = useForgotPasswordMutation();

  const onSubmit = async (values: { usernameOrEmail: string }) => {
    setStatus({
      ...status,
      loading: true,
    });
    forgotPasswordMutation.mutate(values.usernameOrEmail, {
      onSuccess: () => {
        setStatus({
          ...status,
          loading: false,
          success: true,
        });
      },
      onError: (error) => {
        console.log("error", error);
        setStatus({
          error: error.message,
          loading: false,
          success: false,
        });
      },
    });
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
    <>
      {status.success ? (
        <Grid container>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Typography variant="body1" textAlign={"justify"}>
              A password reset link has been sent to your email address. If you
              don't see it in your inbox, please check your spam folder as well.
            </Typography>
          </Grid>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              navigate(window.origin);
            }}
          >
            Okay
          </Button>
        </Grid>
      ) : (
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
            {!status.loading && (
              <ErrorMessage
                error={status.error && "User not found. Please try again"}
              />
            )}
            <Grid item xs={12} mb={2}>
              <Link to={"/"}>{t(forgotPassword.btnlabel.back)}</Link>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" disabled={status.loading}>
                {status.loading
                  ? t(forgotPassword.btnlabel.process)
                  : t(forgotPassword.btnlabel.send)}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </>
  );
};

export default ForgotPassword;
