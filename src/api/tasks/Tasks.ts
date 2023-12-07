import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { allTasksResponse } from ".";

export const getTasks = async (): Promise<allTasksResponse[]> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<allTasksResponse[]>(`${apiBasePath}/tasks`);
  return response.data;
};
