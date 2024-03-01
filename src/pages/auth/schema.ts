import type { TFunction } from "i18next";
import * as yup from "yup";
import LocalizationKey from "~/i18n/key";

const { changePassword, forgotPassword, login } = LocalizationKey;

export const loginSchema = (t: TFunction) => {
  return yup.object({
    username: yup.string().required(t(login.error.usernameRequired)),
    password: yup.string().required(t(login.error.passwordRequired)),
  });
};
export const forgotPasswordSchema = (t: TFunction) => {
  return yup.object({
    usernameOrEmail: yup
      .string()
      .email(t(forgotPassword.incorrectEmail))
      .required(t(forgotPassword.errorRequired)),
  });
};

export const changePasswordSchema = (t: TFunction) => {
  return yup.object().shape({
    password: yup
      .string()
      .min(8, t(changePassword.error.minLength))
      .matches(/[A-Z]/, t(changePassword.error.uppercaseRequired))
      .matches(/[a-z]/, t(changePassword.error.lowercaseRequired))
      .matches(/[0-9]/, t(changePassword.error.numberRequired))
      .matches(/[#$-_!]/, t(changePassword.error.specialCharRequired))
      .required(t(changePassword.error.required)),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], t(changePassword.error.required))
      .required(t(changePassword.error.confirmRequired)),
  });
};
