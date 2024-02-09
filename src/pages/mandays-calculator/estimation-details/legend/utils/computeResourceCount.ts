import { MandaysForm } from "../..";

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
