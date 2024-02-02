import type { TFunction } from "i18next";
import { CommonType, useCommonOption } from "~/queries/common/options";
import * as yup from "yup";
import LocalizationKey from "~/i18n/key";

import { UserManagementForms } from "./types";

const { common, userManagement } = LocalizationKey;

export const commonOptionsAPI = (options: CommonType) => {
  return useCommonOption(options, { keyword: "" });
};

export const genderValueNumToStr = (): SelectObject[] => {
  return commonOptionsAPI("gender").map((e) => {
    return { label: e.label, value: e.value.toString() };
  });
};

export const roleValue = (): SelectObject[] => {
  return commonOptionsAPI("role").map((e) => {
    return { label: e.label, value: e.label };
  });
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
  recentlyJoinedlaterDate: false,
};
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

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
      .matches(emailRegex, t(userManagement.errorMessage.email))
      .required(t(common.errorMessage.required)),
    projectName: yup.string(),
    teamName: yup.string(),
    roles: yup.array(),
    joiningDate: yup
      .string()
      .when("recentlyJoinedlaterDate", (recentlyJoinedlaterDate, schema) => {
        const shouldValidate = Array.isArray(recentlyJoinedlaterDate)
          ? recentlyJoinedlaterDate[0]
          : recentlyJoinedlaterDate;
        return shouldValidate
          ? schema.required(t(common.errorMessage.required))
          : schema.notRequired();
      }),
  });
};
