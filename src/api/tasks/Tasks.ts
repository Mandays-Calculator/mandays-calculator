import {
  AllTasksResponse,
  QueryResponse,
  TaskResponse,
  CreateTask,
  UpdateTask,
  ForGetFunctionality,
} from ".";
import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";

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
): BaseResponse<QueryResponse<AllTasksResponse>> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.put<QueryResponse<AllTasksResponse>>(
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

export const getFunctionality = async (
  name?: string,
): BaseResponse<ForGetFunctionality> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  const response = await axios.get<ForGetFunctionality[]>(
    `${apiBasePath}/functionalities?name=${name}`,
  );
  return response.data;
};
