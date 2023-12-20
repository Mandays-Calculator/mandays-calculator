import type { SucErrType } from "../utils";

import { SucErrData } from ".";

export const HasError = (SucErr: SucErrType): boolean => {
  return SucErr.isAddOdcError ||
    SucErr.isAddHolidayError ||
    SucErr.isUpdateOdcError ||
    SucErr.isUpdateHolidayError;
};

export const HasSuccess = (SucErr: SucErrType): boolean => {
  return SucErr.isAddOdcSuccess ||
    SucErr.isAddHolidaySuccess ||
    SucErr.isUpdateOdcSuccess ||
    SucErr.isUpdateHolidaySuccess;
};

export const MutationOptions = (
  isSuccessOrError: boolean,
  name: string,
  setSuccessError: (SucErr: SucErrType) => void,
): void => {
  if (isSuccessOrError)
    setSuccessError({ ...SucErrData, [name]: true });
};
