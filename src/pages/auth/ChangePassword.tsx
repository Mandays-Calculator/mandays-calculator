import { ReactElement } from 'react';

import { useFormik } from 'formik';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Grid, ListItem, ListItemIcon } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { StyledTitle, StyledLabel } from './components/auth-container';
import PasswordInput from './components/password-input/PasswordInput';
import { CustomButton as Button } from '~/components/form/button';
import { changePasswordSchema } from './schema';
import Form from '~/components/form/Form';

type ValidationResultProps = {
  values: { password: string; confirmPassword: string };
};

const ValidationResult = ({ values }: ValidationResultProps) => {
  const checkValidation = (
    test: boolean,
    label: string,
    dataTestId: string
  ): ReactElement => {
    const GREEN_COLOR = 'green-';
    const RED_COLOR = 'red-';

    return (
      <ListItem>
        <ListItemIcon>
          {test ? (
            <CheckCircleIcon style={{ color: 'green' }} data-testid={GREEN_COLOR + dataTestId} />
          ) : (
            <CancelIcon style={{ color: 'red' }} data-testid={RED_COLOR + dataTestId} />
          )}
        </ListItemIcon>
        {label}
      </ListItem>
    )
  };

  return (
    <>
      {checkValidation(
        values.password.length >= 8,
        'Password must be at least 8 characters long',
        'icon-password-length'
      )}

      {checkValidation(
        /[A-Z]/.test(values.password),
        'Password must contain an uppercase letter',
        'icon-password-uppecase'
      )}

      {checkValidation(
        /[a-z]/.test(values.password),
        'Password must contain a lowercase letter',
        'icon-password-lowercase'
      )}

      {checkValidation(
        /[0-9]/.test(values.password),
        'Password must contain a number',
        'icon-password-number'
      )}

      {checkValidation(
        /(?=.*\W)/.test(values.password),
        'Password must contain one of the following symbols (#$-_!)',
        'icon-password-symbol'
      )}

      {checkValidation(
        values.password === values.confirmPassword && values.password !== '',
        'New password and confirm new password must match.',
        'icon-password-match'
      )}
    </>
  );
};

const ChangePassword = (): ReactElement => {
  const changePasswordForm = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: changePasswordSchema,
    validateOnChange: true,
    onSubmit: () => { },
  });

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
          <ValidationResult values={changePasswordForm.values} />
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
