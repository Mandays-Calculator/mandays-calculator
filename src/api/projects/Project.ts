import axios, { AxiosResponse } from 'axios';
import { getEnvConfig } from '~/utils/env-config';
import { ProjectResponse } from '.';

type BaseResponse<T> = Promise<AxiosResponse<T, any>>;

let apiBasePath: string | undefined;

const getApiBasePath = () => {
  return apiBasePath ?? (getEnvConfig()?.apiBasePath || '');
};

export const createProject = async (params: ProjectResponse): BaseResponse<any> => {
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

export const getProjects = async (): BaseResponse<ProjectResponse[]> => {
  const url = `${getApiBasePath()}/projects`;
  return await axios.get<ProjectResponse[]>(url);
};
