import type { TasksResponse, EstimationResponse } from "./types";

import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";

const getApiBasePath = (): ApiBasePath | string => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  return apiBasePath;
};

export const getTasks = async (): BaseResponse<TasksResponse[]> => {
  const apiBasePath = getApiBasePath();
  const response = await axios.get<TasksResponse[]>(
    `${apiBasePath}/tasks?teamId=a2eb9f01-6e4e-11ee-8624-a0291936d1c2&statusId=1`,
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
