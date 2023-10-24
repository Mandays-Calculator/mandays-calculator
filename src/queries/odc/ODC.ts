import { useQuery } from "react-query";

import { getODCList } from "~/api/odc/ODC";

export const useODCList = () => {
  return useQuery("odcList", () => getODCList());
};
