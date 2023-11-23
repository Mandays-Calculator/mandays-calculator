import type { Complexities } from ".";

import axios from "axios";

const mockEnvConfig = (): { apiBasePathComplexity: string } => ({
  apiBasePathComplexity: "http://localhost:18001",
});

export const getComplexities = async (id: string): Promise<Complexities[]> => {
  const { apiBasePathComplexity } = mockEnvConfig();
  const response = await axios.get(
    `${apiBasePathComplexity}/complexities${id}`
  );

  return response.data;
};