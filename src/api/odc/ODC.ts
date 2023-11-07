import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { ODCListResponse } from ".";

export const getODCList = async (): Promise<ODCListResponse[]> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<ODCListResponse[]>(`${apiBasePath}/odcs`);
  return response.data;
};
