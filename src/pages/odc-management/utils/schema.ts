import type { DataType } from "./type";

import { Schema, array, object, string, number } from "yup";

const DataTypeSchema: Schema<DataType> = object().shape({
  odcName: string().required('ODC Name is required').defined(),
  location: string().default(""),
  abbreviation: string().default(""),
  noHolidays: number().default(0),
});

export const IntValuesSchema = object().shape({
  odcList: array().of(DataTypeSchema),
});