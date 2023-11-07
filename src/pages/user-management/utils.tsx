import { AddUserManagement } from "./types";
import * as yup from "yup";
export const AddUserManagementFormValues: AddUserManagement = {
  lastName: "",
  firstName: "",
  middleName: "",
  suffix: "",
  gender: "",
  email: "",
  careerStep: "",
  projectName: "",
  teamName: "",
  role: "",
};

export const AddUserManagementSchema = yup.object({
  lastName: yup
    .string()
    .min(2, "too short")
    .max(50, "Too Long!")
    .required("Required"),
  firstName: yup.string().default(""),
  middleName: yup.string().default(""),
  suffix: yup.string().default(""),
  gender: yup.string().default(""),
  emailAddress: yup.string().default(""),
  careerStep: yup.string().default(""),
  projectName: yup.string().default(""),
  teamName: yup.string().default(""),
  role: yup.string().default(""),
});
