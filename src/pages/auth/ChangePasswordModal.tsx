import { ReactElement, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Grid, ListItem, ListItemIcon } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import LocalizationKey from "~/i18n/key";
import Form from "~/components/form/Form";
import { CustomButton as Button } from "~/components/form/button";
import { Modal } from "~/components/modal/Modal";

import PasswordInput from "./components/password-input/PasswordInput";
import { StyledTitle, StyledLabel } from "./components/auth-container";
import { changePasswordSchema } from "./schema";

interface ValidationResultProps {
  values: any;
}

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const ValidationResult = ({ values }: ValidationResultProps): ReactNode => {
  const { t } = useTranslation();
  const { changePassword } = LocalizationKey;
  const validationItems = [
    { test: values.password.length >= 8, testId: 'length', message: t(changePassword.validationInfo.charCount) },
    { test: /[A-Z]/.test(values.password), testId: 'uppecase', message: t(changePassword.validationInfo.uppercase) },
    { test: /[a-z]/.test(values.password), testId: 'lowercase', message: t(changePassword.validationInfo.lowercase) },
    { test: /[0-9]/.test(values.password), testId: 'number', message: t(changePassword.validationInfo.number) },
    { test: /(?=.*\W)/.test(values.password), testId: 'symbol', message: t(changePassword.validationInfo.symbol) },
    { test: values.password === values.confirmPassword && values.password !== "", testId: 'match', message: t(changePassword.validationInfo.match) },
  ];

  return (
    <>
      {validationItems.map(({ test, testId, message }) => (
        <ListItem key={testId} disablePadding={true}>
          <ListItemIcon>
            {test ? (
              <CheckIcon style={{ color: "lime" }} data-testid={`green-icon-password-${testId}`} />
            ) : (
              <CloseIcon style={{ color: "red" }} data-testid={`red-icon-password-${testId}`} />
            )}
          </ListItemIcon>
          {message}
        </ListItem>
      ))}
    </>
  );
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  onClose,
}): ReactElement => {
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

  const { values } = changePasswordForm;

  return (
    <Modal open={open} title="" maxWidth="sm" onClose={onClose}>
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
            <Button fullWidth colorVariant="neutral" onClick={onClose} variant="outlined">
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
    </Modal>
  );
};

export default ChangePasswordModal;
