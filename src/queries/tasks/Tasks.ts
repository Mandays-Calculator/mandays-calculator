import type { AllTasksResponse, CreateTask, QueryResponse } from "~/api/tasks";
import { AxiosError } from "axios";

import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

import {
  deleteTask,
  getTasks,
  postTask,
  putUpdateTask,
} from "~/api/tasks/Tasks";

export const useTasks = (
  id: string
): UseQueryResult<QueryResponse<AllTasksResponse[]>, AxiosError> => {
  return useQuery("getTasks", () => getTasks(id));
};

export const usePostTasks = (): UseMutationResult<
  QueryResponse<CreateTask>,
  AxiosError,
  CreateTask
> => {
  return useMutation<QueryResponse<CreateTask>, AxiosError, CreateTask>(
    postTask
  );
};

export const useUpdateTask = (
  id: string,
  updatedData: AllTasksResponse
): UseMutationResult<
  QueryResponse<AllTasksResponse[]>,
  AxiosError,
  AllTasksResponse
> => {
  return useMutation<
    QueryResponse<AllTasksResponse[]>,
    AxiosError,
    AllTasksResponse
  >(() => putUpdateTask(id, updatedData));
};

export const useDeleteTask = (
  id: string
): UseMutationResult<
  QueryResponse<AllTasksResponse>,
  AxiosError,
  AllTasksResponse
> => {
  return useMutation<
    QueryResponse<AllTasksResponse>,
    AxiosError,
    AllTasksResponse
  >(() => deleteTask(id));
};
