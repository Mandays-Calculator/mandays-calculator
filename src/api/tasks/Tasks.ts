import type {
  ForGetFunctionality,
  FucntionalityParams,
  AllTasksResponse,
  UpdateTaskStatus,
  TaskResponse,
  CreateTask,
  UpdateTask,
  ForGetTags,
  Team,
} from ".";

import { getEnvConfig } from "~/utils/env-config";
import axios from "axios";

export const getTasks = async (
  id: string,
  status: string,
  maxItems: string,
  pageNum: string,
): BaseResponse<AllTasksResponse[]> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  const response = await axios.get<AllTasksResponse[]>(
    `${apiBasePath}/tasks?teamId=${id}&statusId=${status}&maxResults=${maxItems}&currentPage=${pageNum}`,
  );
  return response.data;
};

export const postTask = async (
  param: CreateTask,
): BaseResponse<AllTasksResponse> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.post<AllTasksResponse>(
    `${apiBasePath}/tasks`,
    param,
  );

  return response.data;
};

export const putUpdateTask = async (
  param: UpdateTask,
): BaseResponse<AllTasksResponse> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.put<AllTasksResponse>(
    `${apiBasePath}/tasks/${param.id}`,
    param,
  );

  return response.data;
};

export const patchUpdateTaskStatus = async (
  param: UpdateTaskStatus,
): BaseResponse<TaskResponse> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.patch<TaskResponse>(
    `${apiBasePath}/tasks/${param.id}`,
    param.body,
  );

  return response.data;
};

export const deleteTask = async (id: string): BaseResponse<TaskResponse> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.delete<TaskResponse>(
    `${apiBasePath}/tasks/${id}`,
  );

  return response.data;
};

export const getFunctionality = async (
  params: FucntionalityParams,
): BaseResponse<ForGetFunctionality> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.get<ForGetFunctionality[]>(
    `${apiBasePath}/functionalities?teamId=${params.teamId}&name=${params.name}`,
  );

  return response.data;
};

export const getTeamsByUserId = async (
  userId: string,
): BaseResponse<Team[]> => {
  const { apiBasePath } = getEnvConfig();

  const response = await axios.get<Team[]>(
    `${apiBasePath}/users/${userId}/teams`,
  );

  return response.data;
};

export const getTags = async (): BaseResponse<ForGetTags> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.get(`${apiBasePath}/tags`);

  return response.data;
};

export const getComments = async (
  // taskId: string,
): BaseResponse<ForGetFunctionality> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  const response = await axios.get<ForGetFunctionality[]>(
    `${apiBasePath}/task/8de5ce04-cc8c-11ee-ab4a-00090faa0001/comments`,
  );
  return response.data;
};
