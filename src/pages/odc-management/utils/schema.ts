import type { TFunction } from "i18next";

import * as yup from "yup";

import LocalizationKey from "~/i18n/key";

const { odc: { validationInfo } } = LocalizationKey;

export const IntValuesSchema = (t: TFunction) => {
  return yup.object().shape({
    id: yup.string().defined(),
    name: yup
      .string()
      .required(t(validationInfo.nameReq))
      .default(""),
    location: yup
      .string()
      .required(t(validationInfo.locReq))
      .default(""),
    abbreviation: yup.string().default(""),
    holidays: yup.array().nullable(),
    active: yup.boolean().default(true),
    createDate: yup.string().nullable(),
    lastUpdatedDate: yup.string().nullable(),
  });
};
