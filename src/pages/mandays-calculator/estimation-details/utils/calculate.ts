import type { MandaysForm } from "../types";

interface CalculateTotalManHrsEstParams {
  resources: [string, number][];
  formValues: MandaysForm;
  complexityIdParam: string;
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
    data.phases.forEach(processPhase);
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
}: CalculateTotalManHrsEstParams): number => {
  const totalManHours = resources.reduce(
    (total, [careerStep, numberOfResources]) => {
      const complexityInfo = formValues.legends[complexityIdParam].find(
        (item) => item.careerStep === careerStep,
      );

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
