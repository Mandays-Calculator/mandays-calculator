import { CommonOption } from "~/queries/common/options";
import { MandaysForm, Phase, Resource } from "../..";

export interface ResourceData {
  [careerStep: string]: {
    odcId: string;
    numberOfResources: number;
    annualLeaves?: string;
  }[];
}

export const getAllOdcIds = (data: ResourceData): string[] => {
  const odcIds: Set<string> = new Set();

  Object.values(data).forEach((resources) => {
    resources.forEach((resource) => {
      const { odcId } = resource;
      if (odcId) {
        odcIds.add(odcId);
      }
    });
  });

  return Array.from(odcIds);
};

export const getExistingODC = (
  ODCData: CommonOption,
  resoureState: ResourceData,
): any => {
  if (ODCData && resoureState) {
    const existingODC = getAllOdcIds(resoureState);
    return ODCData.filter((odc) => existingODC.includes(odc.value));
  }
  return [];
};

/**
 * Function use for getting work days
 * @param startDate
 * @param endDate
 * @param holidays
 * @returns
 */

export const networkDays = (
  startDate: Date | string | number,
  endDate: Date | string | number,
  holidays: any,
): number => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  const totalDays =
    Math.floor((Number(endDate) - Number(startDate)) / (24 * 60 * 60 * 1000)) +
    1;

  let workingDays = 0;

  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Check if the current day is not a weekend (Saturday or Sunday) and not a holiday
    if (
      currentDate.getDay() !== 0 &&
      currentDate.getDay() !== 6 &&
      !holidays.includes(currentDate.toISOString().split("T")[0])
    ) {
      workingDays++;
    }
  }

  return workingDays;
};

/**
 * Get all holidays in existing odc
 * @param odcs
 * @returns
 */

export const getAllHolidays = (odcs: any): any => {
  let allHolidays: any = [];
  odcs.forEach((odc: any) => {
    if (odc.holidays && Array.isArray(odc.holidays)) {
      allHolidays = allHolidays.concat(
        odc.holidays.map((holiday: any) => holiday.date),
      );
    }
  });

  return allHolidays;
};

export const getTotalResourcesCount = (
  data: Resource,
  itemKey: keyof Resource,
) => {
  const result: any = {};
  for (const key in data) {
    if (data.hasOwnProperty(key) && Array.isArray(data[key])) {
      let totalResources = 0;

      data[key].forEach((item: any) => {
        if (item[itemKey]) {
          totalResources += parseInt(item[itemKey], 10);
        }
      });

      result[key] = totalResources;
    }
  }

  return result;
};

/**
 * Function used for calculating resource estimation based on legends complexities
 * @param formState MandaysForm
 * @returns
 */

interface MultipliedEstimation {
  careerStep: number;
  manHours: number;
}

export const getMultipliedEstimations = (
  formState: MandaysForm,
): MultipliedEstimation[] => {
  const estimations = formState.phases.flatMap((phase: Phase) =>
    phase.functionalities.flatMap((func) =>
      func.estimations.map((estimation) => ({
        ...estimation,
        functionalityName: func.name,
      })),
    ),
  );

  const multipliedEstimationResources = estimations
    .map((task: any) => {
      return formState.legends[task.complexityId].map((estimation: any) => {
        const resourceCount =
          task.resourceCountByTasks[estimation.careerStep] || 0;
        return {
          ...estimation,
          manHours: estimation.manHours * resourceCount,
        };
      });
    })
    .flat();

  return multipliedEstimationResources;
};
