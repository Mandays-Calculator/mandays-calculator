import type {
  ForGetComplexities,
  ForPostComplexities,
  ForPutComplexities,
  GetComplexities,
  PostComplexities,
  PutComplexities,
} from ".";

import axios from "axios";

const mockEnvConfig = (): { apiBasePathComplexity: string } => ({
  apiBasePathComplexity: "http://localhost:18001",
});

export const getComplexities = async (): Promise<
  GetComplexities<ForGetComplexities[]>
> => {
  const { apiBasePathComplexity } = mockEnvConfig();
  const response = await axios.get(`${apiBasePathComplexity}/complexities`);

  return response.data;
};

export const getComplexitiesbyId = async (
  id: string
): Promise<GetComplexities<ForGetComplexities>> => {
  const { apiBasePathComplexity } = mockEnvConfig();
  const response = await axios.get(
    `${apiBasePathComplexity}/complexities/${id}`
  );

  return response.data;
};

export const postComplexities = async (
  requestBody: ForPostComplexities[]
): Promise<PostComplexities> => {
  const { apiBasePathComplexity } = mockEnvConfig();
  const response = await axios.post(
    `${apiBasePathComplexity}/complexities`,
    requestBody
  );
  return response.data;
};

export const putComplexities = async ({
  id,
  ...requestBody
}: ForPutComplexities): Promise<PutComplexities> => {
  const { apiBasePathComplexity } = mockEnvConfig();
  const response = await axios.put(
    `${apiBasePathComplexity}/complexities/${id}`,
    requestBody
  );
  return response.data;
};
