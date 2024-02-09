import type {
  AllTasksResponse,
  QueryResponse,
  DeleteTaskId,
  TaskResponse,
  CreateTask,
  UpdateTask,
} from "~/api/tasks";
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
  id: string,
  status: string,
): UseQueryResult<AllTasksResponse[], AxiosError> => {
  return useQuery(`getTasks-${status}`, () => getTasks(id, status));
};

export const usePostTasks = (): UseMutationResult<
  QueryResponse<CreateTask>,
  AxiosError,
  CreateTask
> => {
  return useMutation<QueryResponse<CreateTask>, AxiosError, CreateTask>(
    postTask,
  );
};

export const useUpdateTask = (): UseMutationResult<
  QueryResponse<AllTasksResponse>,
  AxiosError,
  UpdateTask
> => {
  return useMutation<QueryResponse<AllTasksResponse>, AxiosError, UpdateTask>(
    "putUpdateTask",
    putUpdateTask,
  );
};

export const useDeleteTask = (): UseMutationResult<
  TaskResponse,
  AxiosError,
  DeleteTaskId
> => {
  return useMutation<TaskResponse, AxiosError, DeleteTaskId>(
    "deleteTask",
    params => deleteTask(params.id),
  );
};
