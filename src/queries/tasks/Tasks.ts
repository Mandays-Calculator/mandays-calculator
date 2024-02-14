import type { AxiosError } from "axios";
import type {
  AllTasksResponse,
  QueryResponse,
  DeleteTaskId,
  TaskResponse,
  CreateTask,
  UpdateTask,
  Team,
} from "~/api/tasks";

import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

import {
  putUpdateTask,
  deleteTask,
  postTask,
  getTasks,
  getTeam,
} from "~/api/tasks/Tasks";

export const useTasks = (
  id: string,
  status: string,
  maxItems: string,
  pageNum: string,
): UseQueryResult<QueryResponse<AllTasksResponse[]>, AxiosError> => {
  return useQuery(`getTasks-${status}`, () =>
    getTasks(id, status, maxItems, pageNum),
  );
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

export const useGetTeam = (
  userId: string,
): UseQueryResult<QueryResponse<Team[]>, AxiosError> => {
  return useQuery<QueryResponse<Team[]>, AxiosError>(["getTeam", userId], () =>
    getTeam(userId),
  );
};
