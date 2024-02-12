import { CommonOption } from "~/queries/common/options";

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
  console.log(ODCData, resoureState);
  if (ODCData && resoureState) {
    const existingODC = getAllOdcIds(resoureState);
    return ODCData.filter((odc) => existingODC.includes(odc.value));
  }
  return [];
};
