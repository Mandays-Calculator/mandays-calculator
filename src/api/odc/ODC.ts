import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { ODCListResponse } from ".";

export const getODCList = async () => {
  const { apiBasePath } = getEnvConfig();
  const res = await axios.get<ODCListResponse>(`${apiBasePath}/odcs`);
  return res;
};
