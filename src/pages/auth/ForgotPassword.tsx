import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Grid } from "@mui/material";

import Form from "~/components/form/Form";
import { CustomButton as Button } from "~/components/form/button";
import { ControlledTextField } from "~/components/form/controlled";
import { getFieldError } from "~/components/form/utils";

import { StyledLabel } from "./components/auth-container";
import { forgotPasswordSchema } from "./schema";

const ForgotPassword = (): ReactElement => {
  const navigate = useNavigate();

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
        <StyledLabel textAlign="center">
          Please enter your username or email. <br />A link will be sent to your
          email in order for you to reset your password.
        </StyledLabel>
        <Grid item xs={12} mt={2} mb={2}>
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
        <Grid item xs={12}>
          <Button fullWidth type="submit">
            Send
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ForgotPassword;
