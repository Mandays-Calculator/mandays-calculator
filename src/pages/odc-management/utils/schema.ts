import type { TFunction } from "i18next";

import * as yup from "yup";

import LocalizationKey from "~/i18n/key";

const { odc: { validationInfo } } = LocalizationKey;

export const IntValuesSchema = (t: TFunction) => {
  return yup.object().shape({
    id: yup.string().defined(),
    name: yup
      .string()
      .required(t(validationInfo.nameReq)),
    location: yup
      .string()
      .required(t(validationInfo.locReq)),
    abbreviation: yup.string().default(""),
    holidays: yup.array().nullable(),
    active: yup.boolean().default(true),
  });
};
