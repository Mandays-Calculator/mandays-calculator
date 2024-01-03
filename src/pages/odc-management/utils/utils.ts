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

export const MutationOptions2 = (
  isSuccessOrError: boolean,
  isSuccessOrError2: boolean,
  isSuccessOrError3: boolean,
  isSuccessOrError4: boolean,
  name: string,
  name2: string,
  name3: string,
  name4: string,
  setSuccessError: (SucErr: SucErrType) => void,
): void => {
  if (isSuccessOrError || isSuccessOrError2 || isSuccessOrError3 || isSuccessOrError4)
    setSuccessError({
      ...SucErrData,
      [name]: isSuccessOrError,
      [name2]: isSuccessOrError2,
      [name3]: isSuccessOrError3,
      [name4]: isSuccessOrError4,
    });
};
