import type { SucErrType } from "../utils";

export const HasSuccess = (SucErr: SucErrType): boolean => {
  return SucErr.isAddOdcSuccess ||
    SucErr.isAddHolidaySuccess ||
    SucErr.isUpdateOdcSuccess ||
    SucErr.isUpdateHolidaySuccess;
};

export const HasError = (SucErr: SucErrType): boolean => {
  return SucErr.isAddOdcError ||
    SucErr.isAddHolidayError ||
    SucErr.isUpdateOdcError ||
    SucErr.isUpdateHolidayError;
};
