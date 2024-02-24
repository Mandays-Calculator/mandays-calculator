import { object, string } from "yup";

export const actInfoChangePassSchema = () =>
  object().shape({
    currentPassword: string().required(),
    newPassword: string().required(),
    confirmNewPassword: string().required(),
  });
