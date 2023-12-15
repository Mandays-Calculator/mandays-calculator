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
};

export type AddProps = {
  apiData: OdcParam[];
  data: OdcParam;
  formContext: FormContext;
  setFormContext: (context: FormContext) => void;
};

export type EditTableProps = {
  odcId: string;
};

export type SucErrType = {
  isError: boolean;
  isAddError: boolean;
  isAddSuccess: boolean;
  isUpdateError: boolean;
  isUpdateSuccess: boolean;
  isDeleteError: boolean;
  isDeleteSuccess: boolean;
};
