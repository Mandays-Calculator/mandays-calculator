import type {
  OdcResponse,
  CreateOdcParam,
  UpdateOdcParam,
  HolidayListResponse,
  HolidayResponse,
  CreateHoliday,
  UpdateHoliday,
  DeleteHoliday,
  OdcParam,
} from ".";

import axios from "axios";

import { getEnvConfig } from "~/utils/env-config";

export const getODC = async (): Promise<OdcParam[]> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<OdcParam[]>(`${apiBasePath}/odcs`);
  return response.data;
};

export const addODC = async (params: CreateOdcParam): Promise<OdcResponse> => {
  const { apiBasePath } = getEnvConfig();
  const url = `${apiBasePath}/odcs`;
  try {
    const response = await axios.post<OdcResponse>(url, { ...params });
    if (response.data && response.data.status >= 201) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateODC = async (params: UpdateOdcParam): Promise<OdcResponse> => {
  const { apiBasePath } = getEnvConfig();
  const url = `${apiBasePath}/odcs/${params.id}`;
  try {
    const response = await axios.put<OdcResponse>(url, { ...params });
    if (response.data && response.data.status >= 201) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteODC = async (id: string): Promise<OdcResponse> => {
  const { apiBasePath } = getEnvConfig();
  const url = `${apiBasePath}/odcs/${id}`;
  try {
    const response = await axios.delete<OdcResponse>(url);
    if (response.data && response.data.status >= 201) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHoliday = async (id: string): Promise<HolidayListResponse> => {
  const { apiBasePath } = getEnvConfig();
  const response = await axios.get<HolidayListResponse>(
    `${apiBasePath}/odcs/${id}/holidays`
  );
  return response.data;
};

export const addHoliday = async (params: CreateHoliday): Promise<HolidayResponse> => {
  const { apiBasePath } = getEnvConfig();
  const url = `${apiBasePath}/odcs/${params.odcId}/holidays`;
  try {
    const response = await axios.post<OdcResponse>(url, { ...params.data });
    if (response.data && response.data.status >= 201) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateHoliday = async (params: UpdateHoliday): Promise<HolidayResponse> => {
  const { apiBasePath } = getEnvConfig();
  const url = `${apiBasePath}/odcs/${params.data.odcId}/holidays/${params.data.id}`;
  try {
    const response = await axios.put<HolidayResponse>(url, { ...params.data });
    if (response.data && response.data.status >= 201) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteHoliday = async (params: DeleteHoliday): Promise<HolidayResponse> => {
  const { apiBasePath } = getEnvConfig();
  const url = `${apiBasePath}/odcs/${params.odcId}/holidays/${params.id}`;
  try {
    const response = await axios.delete<HolidayResponse>(url);
    if (response.data && response.data.status >= 201) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
