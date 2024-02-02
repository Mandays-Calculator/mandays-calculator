import type { AuthAPIResponse } from "../auth";
import axios, { AxiosResponse } from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { AddProjectType, Project, ProjectListResponse } from ".";

let apiBasePath: string | ApiBasePath;

const getApiBasePath = () => {
  if (!apiBasePath) {
    apiBasePath = getEnvConfig()?.apiBasePath || "";
  }
  return apiBasePath;
};

export const createProject = async (
  params: AddProjectType,
): Promise<AuthAPIResponse> => {
  const url = `${getApiBasePath()}/projects`;
  const response = await axios.post<AuthAPIResponse>(url, params);

  return handleResultData(response);
};

export const updateProject = async (
  projectId: number | string,
  project: Project,
): Promise<AuthAPIResponse> => {
  const url = `${getApiBasePath()}/projects/${projectId}`;
  const response = await axios.put<AuthAPIResponse>(url, project);

  return handleResultData(response);
};

export const deleteProject = async (
  projectId: number | string,
): Promise<AuthAPIResponse> => {
  const url = `${getApiBasePath()}/projects/${projectId}`;
  const response = await axios.delete<AuthAPIResponse>(url);

  return handleResultData(response);
};

export const getProjects = async (): Promise<ProjectListResponse> => {
  const url = `${getApiBasePath()}/projects`;
  const response = await axios.get<ProjectListResponse>(url);
  return response.data;
};

const handleResultData = async (
  response: AxiosResponse<AuthAPIResponse, any>,
) => {
  try {
    if (response.data && response.data.status >= 201) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
