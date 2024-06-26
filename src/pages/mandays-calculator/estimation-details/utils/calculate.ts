import type { CommonOption } from "~/queries/common/options";
import type { MandaysForm } from "../types";
import type { Holiday } from "../summary/types";

import { isUndefined } from "lodash";

import {
  getAllHolidays,
  getTotalResourcesCount,
  networkDays,
} from "../summary/utils/mapper";

import { checkFormKeys } from "./constants";

interface CalculateTotalManHrsEstParams {
  resources: [string, number][];
  formValues: MandaysForm;
  complexityIdParam: string;
  withComplexityValue?: boolean; // if set to false will only compute the exact total man hours
}

/**
 * Calculates and returns the total number of resources from the provided MandaysForm data.
 * Iterates through the resources in the form, extracting the number of resources for each entry,
 * and summing up the total count.
 * @param {MandaysForm} data - The MandaysForm data containing resources information.
 * @returns {number} - The total number of resources.
 */
export const calculateTotalResourcesOrLeaves = (
  data: MandaysForm,
  odcId?: string,
  type: "numberOfResources" | "annualLeaves" = "numberOfResources",
): number => {
  let totalResources = 0;

  Object.keys(data.resources).forEach((key) => {
    data.resources[key].forEach((resource) => {
      const numberOfResources = parseInt(
        resource[type] as unknown as string,
        10,
      );
      if (!isNaN(numberOfResources)) {
        if (!odcId || (odcId && resource.odcId === odcId)) {
          totalResources += numberOfResources;
        }
      }
    });
  });
  return totalResources;
};

export const calculateTotalResourcesByCareerStep = (
  data: MandaysForm,
  type: "phase" | "resource" = "resource",
  phaseIndex?: number,
): Record<string, number> => {
  const totalResourcesByCareerStep: Record<string, number> = {};

  if (type === "resource") {
    Object.keys(data.resources).forEach((key) => {
      data.resources[key].forEach((resource) => {
        const numberOfResources = parseInt(
          resource.numberOfResources as unknown as string,
          10,
        );
        if (!isNaN(numberOfResources)) {
          totalResourcesByCareerStep[key] =
            (totalResourcesByCareerStep[key] || 0) + numberOfResources;
        }
      });
    });
    return totalResourcesByCareerStep;
  }

  if (type === "phase") {
    const processResource = (resource: any) => {
      const numberOfResources = parseInt(
        resource.numberOfResources as unknown as string,
        10,
      );
      if (!isNaN(numberOfResources)) {
        totalResourcesByCareerStep[resource.careerStep] =
          (totalResourcesByCareerStep[resource.careerStep] || 0) +
          numberOfResources;
      }
    };

    const processPhase = (phase: any) => {
      phase.functionalities.forEach((functionality: any) => {
        functionality.estimations.forEach((estimation: any) => {
          const resourceCountByTasks = estimation.resourceCountByTasks || {};
          Object.keys(resourceCountByTasks).forEach((key) => {
            const resourceCount = resourceCountByTasks[key];
            if (typeof resourceCount === "number") {
              processResource({
                careerStep: key,
                numberOfResources: resourceCount,
              });
            }
          });
        });
      });
    };
    if (!isUndefined(phaseIndex)) {
      processPhase(data.phases[phaseIndex]);
    } else {
      data.phases.forEach(processPhase);
    }
    return totalResourcesByCareerStep;
  }

  return {};
};

/**
 * Calculate total man hours per task
 */
export const calculateTotalManHoursPerTask = ({
  resources,
  formValues,
  complexityIdParam,
  withComplexityValue = true,
}: CalculateTotalManHrsEstParams): number => {
  const totalManHours = resources.reduce(
    (total, [careerStep, numberOfResources]) => {
      const complexityInfo = formValues.legends[complexityIdParam].find(
        (item) => item.careerStep === careerStep,
      );
      if (!withComplexityValue) {
        return total + numberOfResources;
      }

      if (complexityInfo) {
        const manHours = complexityInfo.manHours;
        return total + manHours * numberOfResources;
      }
      return total;
    },
    0,
  );

  return totalManHours;
};

/**
 * Calculate total man hours in phase
 */
export const calculateTotalManHoursPerPhase = (
  formValues: MandaysForm,
): number => {
  let totalManHours = 0;

  formValues.phases.forEach((phase) => {
    phase.functionalities.forEach((functionality) => {
      functionality.estimations.forEach((estimation) => {
        const resourceCountByTasks = estimation.resourceCountByTasks || {};

        Object.entries(resourceCountByTasks).forEach(
          ([careerStep, numberOfResources]) => {
            const complexityId = estimation.complexityId;
            const complexityInfo = formValues.legends[complexityId]?.find(
              (item) => item.careerStep === careerStep,
            );

            if (complexityInfo) {
              const manHours = complexityInfo.manHours || 0;
              totalManHours += manHours * numberOfResources;
            }
          },
        );
      });
    });
  });

  return totalManHours;
};

export const roundOffValue = (
  value: Number,
  type: "days" | "hours" = "days",
): number | string => {
  if (type === "days") {
    const roundedDays = Math.ceil(Number(value));
    return roundedDays;
  }
  if (type === "hours") {
    return value.toFixed(2);
  }
  return 0;
};

export const calculateTotalManHours = (
  formState: MandaysForm,
  existingODC: CommonOption,
  resources: any,
): number => {
  if (checkFormKeys.every((item) => formState.hasOwnProperty(item))) {
    const resourcesLeaves = getTotalResourcesCount(
      formState.resources,
      "annualLeaves",
    );

    const workingDays = networkDays(
      formState.summary.startDate,
      formState.summary.endDate,
      getAllHolidays(existingODC),
    );

    const calculatedValues = Object.entries(resources).map((item: any) => {
      const utilizationValue =
        (workingDays *
          item[1] *
          8 *
          (Number(formState.summary.utilizationRate) / 100)) /
          8 -
        resourcesLeaves[item[0]];
      return isFinite(utilizationValue) ? utilizationValue : 0;
    });

    return calculatedValues && calculatedValues.length > 0
      ? calculatedValues.reduce((a: number, b: number) => a + b)
      : 0;
  }

  return 0;
};

export const calculateTotalManHoursByOdc = (
  formState: MandaysForm,
  numberOfResources: number,
  numberOfLeaves: number,
  holidays: Holiday[],
): number => {
  if (checkFormKeys.every((item) => formState.hasOwnProperty(item))) {
    const workingDays = networkDays(
      formState.summary.startDate,
      formState.summary.endDate,
      holidays,
    );

    /**
     * Calculation:
     * - working days * number of resources * 8
     *      multiplied by
     * - utilization rate / 100
     *      multiplied by
     * - 8
     *      subtracted by
     * - annual leaves
     *
     */

    const calculatedValue =
      (workingDays *
        numberOfResources *
        8 *
        (Number(formState.summary.utilizationRate) / 100)) /
        8 -
      numberOfLeaves;

    return calculatedValue;
  }

  return 0;
};
