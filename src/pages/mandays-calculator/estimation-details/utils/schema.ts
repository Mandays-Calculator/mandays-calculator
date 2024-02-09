import type { TFunction } from "i18next";
import * as yup from "yup";
import LocalizationKey from "~/i18n/key";

const {
  common: { errorMessage },
} = LocalizationKey;

const resourceSchema = (t: TFunction, careerSteps: string[]) => {
  return yup.object().shape(
    careerSteps.reduce((acc: Record<string, any>, key: string) => {
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
            if (values && values.length > 1) {
              // Only check for duplicates if there are more than one entry
              const odcIds = values.map((item: any) => item.odcId);
              return new Set(odcIds).size === odcIds.length;
            }
            return true; // No error if there's only one entry or no entries
          },
        );
      return acc;
    }, {}),
  );
};

export const estimationDetailsSchema = (
  t: TFunction,
  careerSteps: string[],
) => {
  return yup.object().shape({
    summary: yup.object({
      teamId: yup.string().required(t(errorMessage.required)),
      estimationName: yup.string(),
      utilizationRate: yup
        .number()
        .required(t(errorMessage.required))
        .min(
          1,
          "Utilization rate should not be zero. Please provide a valid value.",
        ),
      startDate: yup.string().required(t(errorMessage.required)),
      endDate: yup
        .string()
        .required(t(errorMessage.required))
        .test(
          "is-later",
          "End date must be later than start date",
          function (endDate) {
            const { startDate } = this.parent;
            return (
              !startDate || !endDate || new Date(startDate) < new Date(endDate)
            );
          },
        ),
    }),
    resource: resourceSchema(t, careerSteps),
    tasks: yup
      .array()
      .min(1, "Please select at least 1 task")
      .test(
        "at-least-one-selected",
        "At least one task should have dndStatus as selected",
        function (tasks) {
          if (tasks) return tasks.some((task) => task.dndStatus === "selected");
        },
      ),
  });
};
