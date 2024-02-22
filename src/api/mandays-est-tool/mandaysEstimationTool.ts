import type {
  TasksResponse,
  EstimationResponse,
  EstimationDetailResponse,
  CreateEstimationParam,
  ShareLinkResponse,
  ShareLinkParams,
  EstimationLinkDetailResponse,
} from "./types";

import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";

const getApiBasePath = (): ApiBasePath | string => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  return apiBasePath;
};

export const getTasks = async ({
  teamId,
  status,
  maxResults,
  currentPage,
}: {
  teamId: string;
  status: string;
  maxResults: number;
  currentPage: number;
}): BaseResponse<TasksResponse[]> => {
  const apiBasePath = getApiBasePath();
  const response = await axios.get<TasksResponse[]>(
    `${apiBasePath}/tasks?teamId=${teamId}&statusId=${status}&maxResults=${maxResults}&currentPage=${currentPage}`,
  );
  return response.data;
};

export const getEstimations = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}): BaseResponse<EstimationResponse[]> => {
  const apiBasePath = getApiBasePath();
  const response = await axios.get<EstimationResponse[]>(
    `${apiBasePath}/mandays-estimations`,
    {
      params: {
        projectId: projectId,
        userId: userId,
      },
    },
  );
  return response.data;
};

export const deleteEstimation = async ({
  estimationId,
}: {
  estimationId: string;
}): BaseResponse<EstimationResponse[]> => {
  const apiBasePath = getApiBasePath();
  const response = await axios.delete<EstimationResponse[]>(
    `${apiBasePath}/mandays-estimations/${estimationId}`,
  );
  return response.data;
};

export const getEstimationDetails = async (
  estimationId: string,
): BaseResponse<EstimationDetailResponse> => {
  const apiBasePath = getApiBasePath();
  const response = await axios.get<EstimationDetailResponse>(
    `${apiBasePath}/mandays-estimations/${estimationId}`,
  );
  return response.data;
};

export const createEstimation = async (
  params: CreateEstimationParam,
): BaseResponse<{ id: string }> => {
  const apiBasePath = getApiBasePath();
  const response = await axios.post<EstimationDetailResponse>(
    `${apiBasePath}/mandays-estimations`,
    params,
  );
  return response.data;
};
export const getEstimationLinkDetails = async (
  linkCode: string,
): BaseResponse<EstimationLinkDetailResponse> => {
  const apiBasePath = getApiBasePath();
  const response = await axios.get<EstimationLinkDetailResponse>(
    `${apiBasePath}/mandays-estimations/links?code=${linkCode}`,
  );
  return response.data;
};

export const mandaysEstimationShareLink = async (
  params: ShareLinkParams,
): Promise<ShareLinkResponse> => {
  const { apiBasePath } = getEnvConfig();
  try {
    const res = await axios.post<ShareLinkResponse>(
      `${apiBasePath}/links/mandays-estimations`,
      {
        ...params,
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
};
