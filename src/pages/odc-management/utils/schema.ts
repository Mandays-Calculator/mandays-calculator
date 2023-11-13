import type { ODCListResponse, HolidayType } from "~/api/odc";

import { Schema, array, boolean, object, string } from "yup";

const HolidayTypeSchema: Schema<HolidayType> = object().shape({
  date: string().defined(),
  holiday: string().defined(),
});

const DataTypeSchema: Schema<ODCListResponse> = object().shape({
  id: string().defined(),
  name: string().required('Required'),
  location: string().defined(),
  abbreviation: string().required('Required').defined(),
  holidays: array().of(HolidayTypeSchema).defined(),
  active: boolean().defined(),
});

export const IntValuesSchema = object().shape({
  odcList: array().of(DataTypeSchema),
});