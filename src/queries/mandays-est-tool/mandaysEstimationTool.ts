import { AxiosError } from "axios";
import type { UseQueryOptions, UseQueryResult } from "react-query";
import { useQuery } from "react-query";

import { getTasks } from "~/api/mandays-est-tool/mandaysEstimationTool";
import { TasksResponse } from "~/api/mandays-est-tool/type";

interface QueryResponse<T> {
  status: number;
  data: T;
}

export const useGetTasks = (
  config?: Omit<UseQueryOptions<QueryResponse<TasksResponse[]>, AxiosError>, "queryKey">
): UseQueryResult<QueryResponse<TasksResponse[]>, AxiosError> => {
  return useQuery("getTasks", getTasks, config);
};
