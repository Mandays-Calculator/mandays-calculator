import type {
  OdcResponse,
  CreateOdcParam,
  UpdateOdcParam,
  HolidayResponse,
  CreateHoliday,
  UpdateHoliday,
  DeleteHoliday,
} from "~/api/odc";

import { useMutation } from "react-query";
import { AxiosError } from "axios";

import {
  addODC,
  updateODC,
  deleteODC,
  addHoliday,
  updateHoliday,
  deleteHoliday,
} from "~/api/odc";

export const useAddODC = () => {
  return useMutation<OdcResponse, AxiosError, CreateOdcParam>(
    "addODC",
    (params) => addODC(params)
  );
};

export const useUpdateODC = () => {
  return useMutation<OdcResponse, AxiosError, UpdateOdcParam>(
    "updateODC",
    (params) => updateODC(params)
  );
};

export const useDeleteODC = () =>
  useMutation<OdcResponse, AxiosError, string>(deleteODC);

export const useAddHoliday = () => {
  return useMutation<HolidayResponse, AxiosError, CreateHoliday>(
    "addHoliday",
    (params) => addHoliday(params)
  );
};

export const useUpdateHoliday = () => {
  return useMutation<HolidayResponse, AxiosError, UpdateHoliday>(
    "updateHoliday",
    (params) => updateHoliday(params)
  );
};

export const useDeleteHoliday = () => {
  return useMutation<HolidayResponse, AxiosError, DeleteHoliday>(
    "deleteHoliday",
    (params) => deleteHoliday(params)
  );
};
