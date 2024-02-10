import type { CellProps } from "react-table";
import type { EstimationColumn } from "../../utils/types";
import type { MandaysForm } from "../types";
/**
 * Calculates and returns the total number of resources from the provided MandaysForm data.
 * Iterates through the resources in the form, extracting the number of resources for each entry,
 * and summing up the total count.
 * @param {MandaysForm} data - The MandaysForm data containing resources information.
 * @returns {number} - The total number of resources.
 */
export const calculateTotalResources = (data: MandaysForm): number => {
  let totalResources = 0;

  Object.keys(data.resources).forEach((key) => {
    data.resources[key].forEach((resource) => {
      const numberOfResources = parseInt(
        resource.numberOfResources as unknown as string,
        10,
      );
      if (!isNaN(numberOfResources)) {
        totalResources += numberOfResources;
      }
    });
  });

  return totalResources;
};

interface CalculateTotalManHrsEstParams {
  resources: [string, number][];
  cell: CellProps<EstimationColumn>;
  formValues: MandaysForm;
}

export const calculateTotalManHoursEstimation = ({
  resources,
  cell,
  formValues,
}: CalculateTotalManHrsEstParams) => {
  const totalManHours = resources.reduce(
    (total, [careerStep, numberOfResources]) => {
      const complexityId = cell.row.original.complexityId;
      const complexityInfo = formValues.legends[complexityId].find(
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
