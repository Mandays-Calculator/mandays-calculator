import type { TFunction } from "i18next";
import { CommonType, useCommonOption } from "~/queries/common/options";
import * as yup from "yup";
import LocalizationKey from "~/i18n/key";

import { Gender, UserManagementForms } from "./types";
import renderRole from "~/utils/helpers/renderRoleHelper";

const { common, userManagement } = LocalizationKey;

export const commonOptionsAPI = (options: CommonType) => {
  return useCommonOption(options, { keyword: "" });
};

export const renderGender = (gender: Gender): string => {
  switch (gender) {
    case "FEMALE":
      return "1";
    case "MALE":
      return "2";
    case "NON_BINARY":
    case "NON BINARY":
      return "3";
    case "PREFER_NOT_TO_SAY":
    case "PREFER NOT TO SAY":
      return "4";
    default:
      return "";
  }
};

export const genderValueNumToStr = (): SelectObject[] => {
  return commonOptionsAPI("gender").map((e) => {
    return { label: e.label, value: e.value.toString() };
  });
};

export const roleValue = (): SelectObject[] => {
  return commonOptionsAPI("role").map((e) => {
    return { label: renderRole(e.label), value: e.label };
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
    odcId: yup.string().required(t(common.errorMessage.required)),
    suffix: yup.string(),
    email: yup
      .string()
      .matches(emailRegex, t(userManagement.errorMessage.email))
      .required(t(common.errorMessage.required)),
    projectName: yup.string(),
    teamName: yup.string(),
    roles: yup.array().min(1, "Must have at least 1 role"),
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
