import type { ReactElement, ReactNode } from "react";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { Grid, ListItem, ListItemIcon } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import Form from "~/components/form/Form";
import { CustomButton as Button } from "~/components/form/button";
import PasswordInput from "./components/password-input/PasswordInput";
import { StyledTitle, StyledLabel, AuthContainer } from "./components/auth-container";
import { changePasswordSchema } from "./schema";

const ValidationResult = ({ values }: any): ReactNode => {
  return (
    <>
      <ListItem>
        <ListItemIcon>
          {values.password.length >= 8 ? (
            <CheckCircleIcon style={{ color: "green" }} data-testid="green-icon-password-length" />
          ) : (
            <CancelIcon style={{ color: "red" }} data-testid="red-icon-password-length" />
          )}
        </ListItemIcon>
        Password must be at least 8 characters long
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {/[A-Z]/.test(values.password) ? (
            <CheckCircleIcon style={{ color: "green" }} data-testid="green-icon-password-uppecase" />
          ) : (
            <CancelIcon style={{ color: "red" }} data-testid="red-icon-password-uppecase" />
          )}
        </ListItemIcon>
        Password must contain an uppercase letter
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {/[a-z]/.test(values.password) ? (
            <CheckCircleIcon style={{ color: "green" }} data-testid="green-icon-password-lowercase" />
          ) : (
            <CancelIcon style={{ color: "red" }} data-testid="red-icon-password-lowercase" />
          )}
        </ListItemIcon>
        Password must contain a lowercase letter
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {/[0-9]/.test(values.password) ? (
            <CheckCircleIcon style={{ color: "green" }} data-testid="green-icon-password-number" />
          ) : (
            <CancelIcon style={{ color: "red" }} data-testid="red-icon-password-number" />
          )}
        </ListItemIcon>
        Password must contain a number
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {/(?=.*\W)/.test(values.password) ? (
            <CheckCircleIcon style={{ color: "green" }} data-testid="green-icon-password-symbol" />
          ) : (
            <CancelIcon style={{ color: "red" }} data-testid="red-icon-password-symbol" />
          )}
        </ListItemIcon>
        Password must contain one of the following symbols (#$-_!)
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {values.password === values.confirmPassword &&
            values.password !== "" ? (
            <CheckCircleIcon style={{ color: "green" }} data-testid="green-icon-password-match" />
          ) : (
            <CancelIcon style={{ color: "red" }} data-testid="red-icon-password-match" />
          )}
        </ListItemIcon>
        New password and confirm new password must match.
      </ListItem>
    </>
  );
};

const ChangePassword = (): ReactElement => {
  const navigate = useNavigate();
  const changePasswordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    validateOnChange: true,
    // onSubmit: (values) => console.log("values", values),
    onSubmit: () => { },
  });

  const goBack = (): void => {
    navigate(-1);
  };

  const { values } = changePasswordForm;
  return (
    <AuthContainer>
      <Form instance={changePasswordForm}>
        <StyledTitle>Create New Password</StyledTitle>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <StyledLabel>Enter new password</StyledLabel>
            <PasswordInput name="password" placeholder="Input Password" />
          </Grid>
          <Grid item xs={12}>
            <StyledLabel>Confirm new password</StyledLabel>
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
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6} mt={3} padding="10px">
            <Button type="submit" fullWidth>
              Change Password
            </Button>
          </Grid>

        </Grid>
      </Form>
    </AuthContainer>
  );
};

export default ChangePassword;
