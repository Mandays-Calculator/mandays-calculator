import type {
  DeleteComplexities,
  ForGetComplexities,
  ForPostComplexities,
  ForPutComplexities,
  GetComplexities,
  PostComplexities,
  PutComplexities,
} from ".";

import axios from "axios";

import { getEnvConfig } from "~/utils/env-config";

export const getComplexities = async (): Promise<
  GetComplexities<ForGetComplexities[]>
> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  const response = await axios.get(`${apiBasePath}/complexities`);
  return response;
};

export const postComplexities = async (
  requestBody: ForPostComplexities
): Promise<PostComplexities> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  const response = await axios.post(`${apiBasePath}/complexities`, requestBody);
  return response.data;
};

export const putComplexities = async (
  { id, ...requestBody }: ForPutComplexities
): Promise<PutComplexities> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  const response = await axios.put(`${apiBasePath}/complexities/${id}`, requestBody);
  return response.data;
};

export const deleteComplexities = async (
  id: string
): Promise<DeleteComplexities> => {
  const { apiBasePath } = getEnvConfig("mandaysEstimateService");
  const response = await axios.delete(`${apiBasePath}/complexities/${id}`);
  return response.data;
};
  