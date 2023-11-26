import axios, { AxiosResponse } from 'axios';
import { getEnvConfig } from '~/utils/env-config';
import { ProjectErrorResponse, ProjectResponse } from '.';

type BaseResponse<T> = Promise<AxiosResponse<T, any>>;

let apiBasePath: string | ApiBasePath;

const getApiBasePath = () => {
  if (!apiBasePath) {
    apiBasePath = getEnvConfig()?.apiBasePath || '';
  }
  return apiBasePath;
};

export const createProject = async (params: any): BaseResponse<any> => {
  const url = `${getApiBasePath()}/projects`;
  return await axios.post<any>(url, params);
};

export const updateProject = async (projectId: number | string, params: any): BaseResponse<any> => {
  const url = `${getApiBasePath()}/projects/${projectId}`; //TODO: ask the correct controller name
  return await axios.put<any>(url, params);
};

export const deleteProject = async (projectId: number | string): BaseResponse<any> => {
  const url = `${getApiBasePath()}/projects/${projectId}`; //TODO: ask the correct controller name
  return await axios.delete<any>(url);
};

export const getProjects = async (): BaseResponse<ProjectResponse[] | ProjectErrorResponse> => {
  const url = `${getApiBasePath()}/projects`;
  return await axios.get<ProjectResponse[]>(url);
};
