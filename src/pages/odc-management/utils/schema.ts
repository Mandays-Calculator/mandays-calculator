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
    holidays: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.number().nullable(),
          odcId: yup.string().default(""),
          date: yup.string().default(""),
          recurring: yup.boolean().default(true),
          name: yup.string().default(""),
          createdDate: yup.string().nullable(),
          lastUpdatedDate: yup.string().nullable(),
        })
      )
      .nullable(),
    active: yup.boolean().default(true),
    createdDate: yup.string().nullable(),
    lastUpdatedDate: yup.string().nullable(),
  });
};
