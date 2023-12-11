import type { TFunction } from "i18next";
import { UserManagementForms } from "./types";
import * as yup from "yup";
import LocalizationKey from "~/i18n/key";
import { genders } from "~/utils/constants";

const { common, userManagement } = LocalizationKey;

export const gender = (values?: string | number) => {
  if (values == genders[0].value) {
    return 1;
  } else if (values == genders[1].value) {
    return 2;
  } else if (values == genders[2].value) {
    return 3;
  } else if (values == genders[3].value) {
    return 4;
  }
};

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

export const UserManagementSchema = (t: TFunction) => {
  return yup.object({
    lastName: yup.string().required(t(common.errorMessage.required)),
    firstName: yup.string().required(t(common.errorMessage.required)),
    careerStep: yup.string().required(t(common.errorMessage.required)),
    employeeId: yup.string().required(t(common.errorMessage.required)),
    gender: yup.string().required(t(common.errorMessage.required)),
    middleName: yup.string(),
    odcId: yup.string(),
    suffix: yup.string(),
    email: yup
      .string()
      .email(t(userManagement.errorMessage.email))
      .required(t(common.errorMessage.required)),
    projectName: yup.string(),
    teamName: yup.string(),
    roles: yup.array(),
  });
};
