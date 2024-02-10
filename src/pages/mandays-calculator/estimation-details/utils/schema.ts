import type { TFunction } from "i18next";

import * as yup from "yup";

import LocalizationKey from "~/i18n/key";

const {
  common: { errorMessage },
} = LocalizationKey;

const resourceKeys = ["I03", "I04", "I05", "I06", "I07", "I08", "I09"]; // will replace from API
const resourceSchema = (t: TFunction) => {
  return yup.object().shape(
    resourceKeys.reduce((acc: Record<string, any>, key: string) => {
      acc[key] = yup
        .array()
        .of(
          yup.object().shape({
            odcId: yup.string().required(t(errorMessage.required)),

            numberOfResources: yup.string(),
            annualLeaves: yup.string(),
          }),
        )
        .test(
          "unique-odcIds",
          t(
            LocalizationKey.mandaysCalculator.resourceList.errorMessage
              .duplicateODC,
          ),
          function (values) {
            if (values) {
              const odcIds = values.map((item: any) => item.odcId);
              return new Set(odcIds).size === odcIds.length;
            }
          },
        );
      return acc;
    }, {}),
  );
};

export const estimationDetailsSchema = (t: TFunction) => {
  return yup.object().shape({
    summary: yup.object({
      teamId: yup.string().required(t(errorMessage.required)),
      estimationName: yup.string(),
      utilizationRate: yup.number().required(t(errorMessage.required)),
      startDate: yup.string().required(t(errorMessage.required)),
      endDate: yup.string().required(t(errorMessage.required)),
    }),
    resource: resourceSchema(t),
  });
};
