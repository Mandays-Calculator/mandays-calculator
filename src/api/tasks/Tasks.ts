import {
  AllTasksResponse,
  CreateTask,
  ForGetFunctionality,
  QueryResponse,
  TaskResponse,
  Team,
  UpdateTask,
} from ".";
import axios from "axios";

import { getEnvConfig } from "~/utils/env-config";

export const getTasks = async (
  id: string,
  status: string,
  pageSize: string,
  maxItems: string,
  pageNum: string,
): BaseResponse<AllTasksResponse[]> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  const response = await axios.get<AllTasksResponse[]>(
    `${apiBasePath}/tasks?teamId=${id}&statusId=${status}&pageSize=${pageSize}&maxItems=${maxItems}&pageNumber=${pageNum}`,
  );
  return response.data;
};

export const postTask = async (
  param: CreateTask,
): BaseResponse<QueryResponse<CreateTask>> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.post<QueryResponse<CreateTask>>(
    `${apiBasePath}/tasks`,
    param,
  );

  return response.data;
};

export const putUpdateTask = async (
  param: UpdateTask,
): BaseResponse<QueryResponse<UpdateTask>> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.put<QueryResponse<UpdateTask>>(
    `${apiBasePath}/tasks/${param.id}`,
    param,
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

export const getFunctionality = async (): BaseResponse<
  ForGetFunctionality[]
> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  const response = await axios.get<ForGetFunctionality[]>(
    `${apiBasePath}/functionalities`,
  );
  return response.data;
};

export const getTeam = async (userId: string): BaseResponse<Team[]> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.get<Team[]>(
    `${apiBasePath}/users/${userId}/teams`,
  );
  return response.data;
};
