import type { OdcParam, HolidayListResponse } from "~/api/odc";

import { useState } from "react";
import { useQuery } from "react-query";

import { getODC, getHoliday } from "~/api/odc/ODC";

export const useODCList = () => {
  return useQuery<OdcParam[], Error>("odcList", getODC);
};

export const useHolidayList = (id: string) => {
  const [hasError, setHasError] = useState<boolean>(false);
  return useQuery<HolidayListResponse, Error>(
    ["odcList", id],
    () => getHoliday(id),
    { enabled: !hasError, onError: () => setHasError(true) }
  );
};
