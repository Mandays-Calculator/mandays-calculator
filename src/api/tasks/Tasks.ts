import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { AllTasksResponse, CreateTask, QueryResponse } from ".";

export const getTasks = async (
  id: string
): BaseResponse<AllTasksResponse[]> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  const response = await axios.get<AllTasksResponse[]>(
    `${apiBasePath}/tasks/${id}`
  );
  return response.data;
};

export const postTask = async (
  param: CreateTask
): BaseResponse<QueryResponse<CreateTask>> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.post<QueryResponse<CreateTask>>(
    `${apiBasePath}/task`,
    param
  );

  return response.data;
};

export const putUpdateTask = async (
  id: string,
  param: AllTasksResponse
): BaseResponse<AllTasksResponse> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.put<AllTasksResponse>(
    `${apiBasePath}/tasks/${id}`,
    param
  );
  return response.data;
};

export const deleteTask = async (
  id: string
): BaseResponse<AllTasksResponse> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");

  const response = await axios.delete<AllTasksResponse>(
    `${apiBasePath}/tasks/${id}`
  );
  return response.data;
};
