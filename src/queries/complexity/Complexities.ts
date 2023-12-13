import type { GetComplexities, ForGetComplexities } from "~/api/complexity";

import { useState } from "react";
import { useQuery } from "react-query";

import { getComplexities, getComplexitiesbyId } from "~/api/complexity";

export const useGetComplexities = () => {
  const [hasError, setHasError] = useState(false);
  return useQuery<GetComplexities<ForGetComplexities[]>, Error>(
    "getComplexities",
    getComplexities,
    { enabled: !hasError, onError: () => setHasError(true) }
  );
};
  

export const useGetComplexitiesbyId = (id: string, shouldFetch: boolean) =>
  useQuery<GetComplexities<ForGetComplexities>, Error>(
    ["getComplexities", id],
    () => getComplexitiesbyId(id),
    {
      enabled: shouldFetch,
    }
  );
