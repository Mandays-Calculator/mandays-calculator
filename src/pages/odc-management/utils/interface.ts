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
