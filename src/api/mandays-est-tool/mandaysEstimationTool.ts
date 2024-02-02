import type { TasksResponse, EstimationResponse } from "./types";

import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";

const getApiBasePath = (): ApiBasePath | string => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  return apiBasePath;
};

export const getTasks = async (): BaseResponse<TasksResponse[]> => {
  const apiBasePath = getApiBasePath();
  const response = await axios.get<TasksResponse[]>(`${apiBasePath}/tasks/DEV`);
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
