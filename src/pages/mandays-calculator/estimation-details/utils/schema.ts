import type { TFunction } from "i18next";
import * as yup from "yup";
import LocalizationKey from "~/i18n/key";
import { calculateTotalResourcesByCareerStep } from "./calculate";
import { MandaysForm } from "..";

const {
  common: { errorMessage },
  mandaysCalculator: { errorMessages },
} = LocalizationKey;
/**
 * Set of schemas for validation in mandays form
 */
const resourceSchema = (t: TFunction, careerSteps: string[]) => {
  return yup
    .object()
    .shape(
      careerSteps.reduce((acc: Record<string, any>, key: string) => {
        acc[key] = yup
          .array()
          .of(
            yup.object().shape({
              odcId: yup.string().required(t(errorMessage.required)),
              numberOfResources: yup
                .number()
                .min(1, t(errorMessages.resourceRequired))
                .required(t(errorMessage.required)),
              annualLeaves: yup.string(),
            }),
          )
          // Test if 2 odc entry per career level should be different
          .test(
            "unique-odcIds",
            t(
              LocalizationKey.mandaysCalculator.resourceList.errorMessage
                .duplicateODC,
            ),
            function (values) {
              if (values && values.length > 1) {
                const odcIds = values.map((item: any) => item.odcId);
                return new Set(odcIds).size === odcIds.length;
              }
              return true;
            },
          );
        return acc;
      }, {}),
    ) // Test that must have atleast 1 resource filled
    .test(
      "at-least-one-odcId",
      t(errorMessages.pleaseSelect1Resource),
      function (values) {
        if (Object.values(values).length > 0) {
          return Object.values(values).some((item: any) => item.length > 0);
        }
        return false;
      },
    );
};

const phaseSchema = (careerSteps: string[], t: TFunction) => {
  return yup.array().of(
    yup.object().shape({
      name: yup.string().required(t(errorMessage.required)),
      functionalities: yup.array().of(
        yup.object().shape({
          id: yup.string(),
          name: yup.string(),
          estimations: yup.array().of(
            yup
              .object()
              .shape({
                taskId: yup.string(),
                task: yup.string(),
                complexityId: yup.string(),
                complexity: yup.string(),
                resourceCountByTasks: yup.object().shape(
                  careerSteps.reduce(
                    (acc: Record<string, any>, key: string) => {
                      acc[key] = yup
                        .number()
                        .test(
                          "resource-count-validation",
                          t(errorMessages.resourceRequired, { key: key }),
                          function () {
                            const valueContext = this.options
                              .context as MandaysForm;
                            const availableResources =
                              calculateTotalResourcesByCareerStep(
                                valueContext,
                                "resource",
                              );
                            const valueResource =
                              calculateTotalResourcesByCareerStep(
                                valueContext,
                                "phase",
                              );
                            if (valueResource.hasOwnProperty(key)) {
                              return (
                                valueResource[key] <= availableResources[key]
                              );
                            }
                            return true;
                          },
                        );
                      return acc;
                    },
                    {},
                  ),
                ),
              })
              .test(
                "resource-must-have-value",
                t(errorMessages.assignedResource),
                function (value) {
                  return Object.values(value.resourceCountByTasks).some(
                    (resource) => resource !== 0,
                  );
                },
              ),
          ),
        }),
      ),
    }),
  );
};

const taskSchema = (t: TFunction) => {
  return yup
    .array()
    .test(
      "at-least-one-selected",
      t(errorMessages.pleaseSelect1Task),
      function (tasks) {
        if (tasks) return tasks.some((task) => task.dndStatus === "selected");
      },
    );
};

const summarySchema = (t: TFunction) => {
  return yup.object({
    teamId: yup.string().required(t(errorMessage.required)),
    estimationName: yup.string(),
    utilizationRate: yup
      .number()
      .required(t(errorMessage.required))
      .min(1, t(errorMessages.utilRateValidValue)),
    startDate: yup.string().required(t(errorMessage.required)),
    endDate: yup
      .string()
      .required(t(errorMessage.required))
      .test("is-later", t(errorMessages.endDateisLater), function (endDate) {
        const { startDate } = this.parent;
        return (
          !startDate || !endDate || new Date(startDate) < new Date(endDate)
        );
      }),
  });
};

export const estimationDetailsSchema = (
  t: TFunction,
  careerSteps: string[],
) => {
  return yup.object().shape({
    summary: summarySchema(t),
    resources: resourceSchema(t, careerSteps),
    tasks: taskSchema(t),
    phases: phaseSchema(careerSteps, t),
  });
};
