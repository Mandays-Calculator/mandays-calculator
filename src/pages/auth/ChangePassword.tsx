import type { ReactElement, ReactNode } from "react";

import { useLocation } from "react-router-dom";
import { useFormik } from "formik";

import { Grid, ListItem, ListItemIcon } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import Form from "~/components/form/Form";
import { CustomButton as Button } from "~/components/form/button";
import PasswordInput from "./components/password-input/PasswordInput";
import { StyledTitle, StyledLabel } from "./components/auth-container";
import { changePasswordSchema } from "./schema";

const ValidationResult = ({ values }: any): ReactNode => {
  return (
    <>
      <ListItem>
        <ListItemIcon>
          {values.password.length >= 8 ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <CancelIcon style={{ color: "red" }} />
          )}
        </ListItemIcon>
        Password must be at least 8 characters long
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {/[A-Z]/.test(values.password) ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <CancelIcon style={{ color: "red" }} />
          )}
        </ListItemIcon>
        Password must contain an uppercase letter
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {/[a-z]/.test(values.password) ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <CancelIcon style={{ color: "red" }} />
          )}
        </ListItemIcon>
        Password must contain a lowercase letter
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {/[0-9]/.test(values.password) ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <CancelIcon style={{ color: "red" }} />
          )}
        </ListItemIcon>
        Password must contain a number
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {/[#$-_!]/.test(values.password) ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <CancelIcon style={{ color: "red" }} />
          )}
        </ListItemIcon>
        Password must contain one of the following symbols (#$-_!)
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {values.password === values.confirmPassword &&
          values.password !== "" ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <CancelIcon style={{ color: "red" }} />
          )}
        </ListItemIcon>
        New password and confirm new password must match.
      </ListItem>
    </>
  );
};

const ChangePassword = (): ReactElement => {
  const location = useLocation();
  const { state } = location;
  console.log(location, "locatio");
  console.log(state.usernameOrEmail, "username or email");
  const changePasswordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    validateOnChange: true,
    onSubmit: (values) => console.log("values", values),
  });

  const { values } = changePasswordForm;
  return (
    <Form instance={changePasswordForm}>
      <StyledTitle>Create New Password</StyledTitle>
      <Grid container>
        <Grid item xs={12}>
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
        <Grid item xs={12} mt={3}>
          <Button type="submit" fullWidth>
            Change Password
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ChangePassword;
