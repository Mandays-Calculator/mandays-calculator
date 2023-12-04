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
    .required("Last Name is required"),
  firstName: yup
    .string()
    .min(2, "too short")
    .max(50, "Too Long!")
    .required("First Name is required"),
  careerStep: yup.string().required("Career Step is required"),
  employeeId: yup.string().required("Employee ID is required"),
  gender: yup.string().required("Gender is required"),
  middleName: yup.string().default(""),
  odcId: yup.string().default(""),
  suffix: yup.string().default(""),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  projectName: yup.string().default(""),
  teamName: yup.string().default(""),
  roles: yup.array(),
});
