import type { OdcParam, HolidayParam } from "~/api/odc";

export interface IntValues {
  odcList: OdcParam[];
};

export type FormContext = '' | 'Add' | 'Edit' | 'Delete'

export type FieldValue = {
  name: string;
  abbreviation: string;
  location: string;
  holidays: HolidayParam[] | null;
}

export type ViewProps = {
  data: OdcParam[];
  setFormContext: (context: FormContext) => void;
  setIdx: (idx: string) => void;
  setSuccessError: (sucErr: SucErrType) => void;
};

export type AddProps = {
  apiData: OdcParam[];
  data: OdcParam;
  formContext: FormContext;
  setFormContext: (context: FormContext) => void;
  setSuccessError: (sucErr: SucErrType) => void;
};

export type AddTableProps = {
  setSuccessError: (sucErr: SucErrType) => void;
};

export type EditTableProps = {
  odcId: string;
  setSuccessError: (sucErr: SucErrType) => void;
};

export type SucErrType = {
  isOdcError: boolean;
  isHolidayError: boolean;
  isAddOdcError: boolean;
  isAddOdcSuccess: boolean;
  isUpdateOdcError: boolean;
  isUpdateOdcSuccess: boolean;
  isDeleteOdcError: boolean;
  isDeleteOdcSuccess: boolean;
  isAddHolidayError: boolean;
  isAddHolidaySuccess: boolean;
  isUpdateHolidayError: boolean;
  isUpdateHolidaySuccess: boolean;
  isDeleteHolidayError: boolean;
  isDeleteHolidaySuccess: boolean;
};
