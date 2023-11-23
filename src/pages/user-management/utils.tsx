import { UserManagementForms } from "./types";
import * as yup from "yup";
export const UserManagementFormValues: UserManagementForms = {
  image: "",
  lastName: "",
  firstName: "",
  middleName: "",
  suffix: "",
  gender: "",
  email: "",
  careerStep: "",
  odcId: "",
  employeeId: "",
  projectId: "",
  joiningDate: "",
  teamId: "",
  roles: [],
};

export const UserManagementSchema = yup.object({
  lastName: yup
    .string()
    .min(2, "too short")
    .max(50, "Too Long!")
    .required("Required"),
  firstName: yup.string().default(""),
  middleName: yup.string().default(""),
  odcId: yup.string().default(""),
  suffix: yup.string().default(""),
  gender: yup.string().default(""),
  emailAddress: yup.string().default(""),
  employeeId: yup.string().default(""),
  careerStep: yup.string().default(""),
  projectName: yup.string().default(""),
  teamName: yup.string().default(""),
  roles: yup.string().default(""),
});
