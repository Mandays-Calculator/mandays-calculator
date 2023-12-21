import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { RoleTypeResponse } from ".";

export const getRoles = async (): Promise<RoleTypeResponse[]> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<Promise<RoleTypeResponse[]>>(
    `${apiBasePath}/roles`
  );
  return response.data;
};
