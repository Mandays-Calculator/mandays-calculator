import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Grid } from "@mui/material";

import LocalizationKey from "~/i18n/key";
import Form from "~/components/form/Form";
import { CustomButton as Button } from "~/components/form/button";
import { Modal } from "~/components/modal/Modal";

import ValidationResult from "./components/validation-result/ValidationResult";
import PasswordInput from "./components/password-input/PasswordInput";
import { StyledTitle, StyledLabel } from "./components/auth-container";
import { changePasswordSchema } from "./schema";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

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
    validationSchema: changePasswordSchema(t),
    validateOnChange: true,
    onSubmit: () => {},
  });

  const { values } = changePasswordForm;

  return (
    <Modal open={open} title="" maxWidth="sm" onClose={onClose}>
      <Form instance={changePasswordForm}>
        <StyledTitle>{t(changePassword.label.createNewPassword)}</StyledTitle>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <StyledLabel>
              {t(changePassword.label.enterNewPassword)}
            </StyledLabel>
            <PasswordInput
              name="password"
              placeholder={t(changePassword.placeholder.password)}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledLabel>
              {t(changePassword.label.confirmNewPassword)}
            </StyledLabel>
            <PasswordInput
              name="confirmPassword"
              placeholder={t(changePassword.placeholder.confirmPassword)}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <ValidationResult values={values} />
          </Grid>
          <Grid item xs={6} mt={3} padding="10px">
            <Button
              fullWidth
              colorVariant="neutral"
              onClick={onClose}
              variant="outlined"
            >
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
