import { AxiosError } from "axios";
import type { UseQueryOptions, UseQueryResult } from "react-query";
import { useQuery } from "react-query";

import { getEstimations, getTasks } from "~/api/mandays-est-tool/";
import {
  EstimationResponse,
  TasksResponse,
} from "~/api/mandays-est-tool/types";

interface QueryResponse<T> {
  status: number;
  data: T;
}

export const useGetTasks = (
  teamId: string,
  status: string,
  config?: Omit<
    UseQueryOptions<QueryResponse<TasksResponse[]>, AxiosError>,
    "queryKey"
  >,
): UseQueryResult<QueryResponse<TasksResponse[]>, AxiosError> => {
  return useQuery(
    "getTasks",
    () => getTasks({ teamId: teamId, status: status }),
    config,
  );
};

export const useGetEstimations = (params: {
  projectId: string;
  userId: string;
}): UseQueryResult<QueryResponse<EstimationResponse[]>, AxiosError> => {
  return useQuery("getEstimations", () => getEstimations(params));
};
