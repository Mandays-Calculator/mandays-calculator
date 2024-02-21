import type { AxiosError } from "axios";
import type {
  AllTasksResponse,
  QueryResponse,
  DeleteTaskId,
  TaskResponse,
  CreateTask,
  UpdateTask,
  ForGetTags,
  UpdateTaskStatus,
  GetComments,
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
  getTags,
  patchUpdateTaskStatus,
  getComments,
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
  AllTasksResponse,
  AxiosError,
  CreateTask
> => {
  return useMutation<AllTasksResponse, AxiosError, CreateTask>(postTask);
};

export const useUpdateTask = (): UseMutationResult<
  AllTasksResponse,
  AxiosError,
  UpdateTask
> => {
  return useMutation<AllTasksResponse, AxiosError, UpdateTask>(
    "putUpdateTask",
    putUpdateTask,
  );
};

export const useUpdateTaskStatus = (): UseMutationResult<
  BaseResponse<TaskResponse>,
  AxiosError,
  UpdateTaskStatus
> => {
  return useMutation<BaseResponse<TaskResponse>, AxiosError, UpdateTaskStatus>(
    "patchUpdateTaskStatus",
    patchUpdateTaskStatus,
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

export const useGetTags = (): UseQueryResult<ForGetTags, AxiosError> => {
  return useQuery("getTags", getTags);
};

export const useComments = (
): UseQueryResult<QueryResponse<GetComments[]>, AxiosError> => {
  return useQuery(`getComments`, () =>
    getComments(),
  );
};