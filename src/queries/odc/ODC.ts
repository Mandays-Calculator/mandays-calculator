import type { ODCListResponse } from "~/api/odc";
import { useQuery } from "react-query";

import { getODCList } from "~/api/odc/ODC";

export const useODCList = () => {
  return useQuery<ODCListResponse[], Error>("odcList", getODCList);
};
