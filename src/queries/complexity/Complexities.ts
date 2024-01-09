import type { GetComplexities, ForGetComplexities } from "~/api/complexity";

import { useState } from "react";
import { useQuery } from "react-query";

import { getComplexities } from "~/api/complexity";

export const useGetComplexities = () => {
  const [hasError, setHasError] = useState(false);
  return useQuery<GetComplexities<ForGetComplexities[]>, Error>(
    "getComplexities",
    getComplexities,
    { enabled: !hasError, onError: () => setHasError(true) }
  );
};
