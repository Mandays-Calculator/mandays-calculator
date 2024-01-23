import axios from "axios";
import { getEnvConfig } from "~/utils/env-config";
import { CareerStepResponse, RoleTypeResponse, CountryResponse } from ".";

export const getRoles = async (): Promise<RoleTypeResponse[]> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<Promise<RoleTypeResponse[]>>(
    `${apiBasePath}/roles`
  );
  return response.data;
};

export const getCareerSteps = async (): Promise<CareerStepResponse[]> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<Promise<CareerStepResponse[]>>(
    `${apiBasePath}/career-steps`
  );
  return response.data;
};

export const getCountries = async (): Promise<CountryResponse[]> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<Promise<CountryResponse[]>>(
    `${apiBasePath}/countries`
  );
  return response.data;
};

export const getGenders = async (): Promise<CountryResponse[]> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<Promise<CountryResponse[]>>(
    `${apiBasePath}/gender/all`
  );
  return response.data;
};
