import type {
  AllTasksResponse,
  CreateTask,
  DeleteId,
  ForGetFunctionality,
  QueryResponse,
  TaskResponse,
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
  getFunctionality,
  getTasks,
  postTask,
  putUpdateTask,
} from "~/api/tasks/Tasks";

export const useTasks = (
  id: string,
  status: string,
  maxItems: string,
  pageNum: string,
): UseQueryResult<QueryResponse<AllTasksResponse[]>, AxiosError> => {
  return useQuery(`getTasks-${status}`, () =>
    getTasks(id, status,  maxItems, pageNum),
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
  QueryResponse<UpdateTask>,
  AxiosError,
  UpdateTask
> => {
  return useMutation<QueryResponse<UpdateTask>, AxiosError, UpdateTask>(
    "putUpdateTask",
    putUpdateTask,
  );
};

export const useDeleteTask = (): UseMutationResult<
  TaskResponse,
  AxiosError,
  DeleteId
> => {
  return useMutation<TaskResponse, AxiosError, DeleteId>(
    "deleteTask",
    (params) => deleteTask(params.id),
  );
};

export const useGetFunctionality = (): UseQueryResult<
  QueryResponse<ForGetFunctionality>,
  AxiosError
> => {
  return useQuery("getFunctionality", () => getFunctionality);
};
