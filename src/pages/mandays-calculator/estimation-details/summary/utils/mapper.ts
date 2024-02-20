import type { CommonOption } from "~/queries/common/options";
import type { MandaysForm, Phase, Resource } from "../..";
import type { ExistingODC, Holiday, ResourceData } from "../types";

/**
 *
 * @param data Formvalues resources
 * @returns all existing odc id in the resource form values
 */
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

/**
 *
 * @param ODCData Common option ODC from API
 * @param resoureState form values Resources
 * @returns all Existing odc with values from API
 */
export const getExistingODC = (
  ODCData: CommonOption,
  resoureState: ResourceData,
): ExistingODC[] => {
  if (ODCData && resoureState) {
    const existingODC = getAllOdcIds(resoureState);
    return ODCData.filter((odc) =>
      existingODC.includes(odc.value),
    ) as ExistingODC[];
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
  holidays: Holiday[],
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
      !holidays.includes(
        currentDate.toISOString().split("T")[0] as unknown as Holiday,
      )
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

export const getAllHolidays = (odcs: CommonOption): Holiday[] => {
  let allHolidays: Holiday[] = [];
  odcs.forEach((odc: any) => {
    if (odc.holidays && Array.isArray(odc.holidays)) {
      allHolidays = allHolidays.concat(
        odc.holidays.map((holiday: { date: string }) => holiday.date),
      );
    }
  });

  return allHolidays;
};

/**
 *
 * @param data Form values resource
 * @param itemKey  annualLeaves or resourceCount
 * @returns total value of annual leaves or resource per ODC
 */
export const getTotalResourcesCount = (
  data: Resource,
  itemKey: keyof Resource,
) => {
  const result: {
    [key: string]: number;
  } = {};
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
/**
 * 
 * @param formState 
 * @param funcIndex 
 * @returns  list of resources with multiplied manHours based on estimations
    {careerStep: 'I03', manHours: 8}
 */
export const getResourceEstimationPerFunction = (
  formState: MandaysForm,
  funcIndex: number,
): MultipliedEstimation[] => {
  const estimations = formState.phases.flatMap((phase: Phase) =>
    phase.functionalities[funcIndex].estimations.map((estimation) => ({
      ...estimation,
    })),
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
