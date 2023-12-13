import type { ODCListResponse, HolidayType } from "~/api/odc";

export interface IntValues {
  odcList: ODCListResponse[];
};

export type FormContext = '' | 'Add' | 'Edit' | 'Delete'

export type FieldValue = {
  name: string;
  abbreviation: string;
  location: string;
  holidays: HolidayType[] | null;
}

export type ViewProps = {
  data: ODCListResponse[];
  setFormContext: (context: FormContext) => void;
  setIdx: (idx: number) => void;
};

export type AddProps = {
  apiData: ODCListResponse[];
  data: ODCListResponse;
  formContext: FormContext;
  setFormContext: (context: FormContext) => void;
};
