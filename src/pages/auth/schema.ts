import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const forgotPasswordSchema = yup.object({
  usernameOrEmail: yup.string().required(),
});

export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(
      /[#$-_!]/,
      "Password must contain one of the following symbols (#$-_!)"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});
