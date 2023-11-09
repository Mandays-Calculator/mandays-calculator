import { ReactElement, ReactNode } from "react";
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

interface ValidationResultProps {
  values: any;
}

const ValidationResult = ({ values }: ValidationResultProps): ReactNode => {
  const validationItems = [
    { test: values.password.length >= 8, testId: 'length', message: 'Password must be at least 8 characters long' },
    { test: /[A-Z]/.test(values.password), testId: 'uppecase', message: 'Password must contain an uppercase letter' },
    { test: /[a-z]/.test(values.password), testId: 'lowercase', message: 'Password must contain a lowercase letter' },
    { test: /[0-9]/.test(values.password), testId: 'number', message: 'Password must contain a number' },
    { test: /(?=.*\W)/.test(values.password), testId: 'symbol', message: 'Password must contain one of the following symbols (#$-_!)' },
    { test: values.password === values.confirmPassword && values.password !== "", testId: 'match', message: 'New password and confirm new password must match.' },
  ];

  return (
    <>
      {validationItems.map(({ test, testId, message }) => (
        <ListItem key={testId}>
          <ListItemIcon>
            {test ? (
              <CheckCircleIcon style={{ color: "green" }} data-testid={`green-icon-password-${testId}`} />
            ) : (
              <CancelIcon style={{ color: "red" }} data-testid={`red-icon-password-${testId}`} />
            )}
          </ListItemIcon>
          {message}
        </ListItem>
      ))}
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
            <PasswordInput name="confirmPassword" placeholder="Confirm Password" />
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
