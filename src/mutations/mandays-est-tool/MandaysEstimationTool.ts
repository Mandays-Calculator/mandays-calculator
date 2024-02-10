import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { deleteEstimation } from "~/api/mandays-est-tool";

export const useDeleteEstimation = () => {
  return useMutation<{ estimationId: string }, AxiosError, any>(
    "deletEstimation",
    (estimationId: string) => deleteEstimation({ estimationId: estimationId }),
  );
};
