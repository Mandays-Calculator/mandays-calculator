import { AxiosError } from "axios";
import type { UseQueryOptions, UseQueryResult } from "react-query";
import { useQuery } from "react-query";

import {
  getEstimationDetails,
  getEstimations,
  getTasks,
} from "~/api/mandays-est-tool/";
import {
  EstimationDetailResponse,
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
  maxResults: number,
  currentPage: number,
  config?: Omit<
    UseQueryOptions<QueryResponse<TasksResponse[]>, AxiosError>,
    "queryKey"
  >,
): UseQueryResult<QueryResponse<TasksResponse[]>, AxiosError> => {
  return useQuery(
    "getTasks",
    () =>
      getTasks({
        teamId: teamId,
        status: status,
        maxResults: maxResults,
        currentPage: currentPage,
      }),
    config,
  );
};

export const useGetEstimations = (params: {
  projectId: string;
  userId: string;
}): UseQueryResult<QueryResponse<EstimationResponse[]>, AxiosError> => {
  return useQuery("getEstimations", () => getEstimations(params));
};

export const useGetEstimationDetails = (
  estimationId: string,
): UseQueryResult<QueryResponse<EstimationDetailResponse>, AxiosError> => {
  return useQuery("getEstimations", () => getEstimationDetails(estimationId));
};
