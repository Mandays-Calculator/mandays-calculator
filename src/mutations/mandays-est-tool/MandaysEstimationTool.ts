import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { deleteEstimation } from "~/api/mandays-est-tool";

export const useDeleteHoliday = ({
  estimationId,
}: {
  estimationId: string;
}) => {
  return useMutation<{ estimationId: string }, AxiosError, any>(
    "deletEstimation",
    () => deleteEstimation({ estimationId: estimationId }),
  );
};
