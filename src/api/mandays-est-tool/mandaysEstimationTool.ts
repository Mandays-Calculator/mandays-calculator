import type { TasksResponse } from "./type";

import { getEnvConfig } from "~/utils/env-config";
import axios from "axios";

export const getTasks = async (): BaseResponse<TasksResponse[]> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  const response = await axios.get<TasksResponse[]>(`${apiBasePath}/tasks/DEV`);
  return response.data;
};
