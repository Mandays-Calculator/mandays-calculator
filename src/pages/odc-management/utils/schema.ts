import { Schema, array, object, string, boolean } from "yup";
import { IntValues } from "./interface";
import { ODCListResponse } from "~/api/odc/types";

interface DataType {
  id: string;
  name: string;
  abbreviation: string;
  location: string;
  holidays: string | null;
  active: boolean;
}
export const DataTypeSchema: Schema<DataType> = object().shape({
  id: string().default("0"),
  name: string()
    .required("ODC Name is required")
    .test({
      name: "is-unique-name",
      message: "ODC Name must be unique",
      test: function (value) {
        let isNotDuplicate = true;
        if (this.from && this.from.length > 1) {
          const odcList: ODCListResponse[] = (this.from[1].value as IntValues)
            .odcList;
          if (this.path === "odcList[0].name") {
            const otherODCNames = odcList
              .filter((_odc, index: number) => index !== 0)
              .map((odc) => odc.name.toLowerCase());
            return otherODCNames.includes(value.toLowerCase()) ? false : true;
          }
        }
        return isNotDuplicate;
      },
    }),
  location: string().required("Location is required"),
  abbreviation: string()
    .default("")
    .test({
      name: "is-unique-abbreviation",
      message: "Abbreviation must be unique",
      test: function (value) {
        let isNotDuplicate = true;
        if (this.from && this.from.length > 1) {
          const odcList = (this.from[1].value as IntValues).odcList;
          if (this.path === "odcList[0].abbreviation") {
            const otherAbbreviations = odcList
              .filter((_odc, index: number) => index !== 0)
              .map((odc) => odc.abbreviation.toLowerCase());
            return otherAbbreviations.includes(value.toLowerCase())
              ? false
              : true;
          }
        }
        return isNotDuplicate;
      },
    }),
  holidays: string().nullable().defined(),
  active: boolean().default(true),
});

export const IntValuesSchema = object().shape({
  odcList: array().of(DataTypeSchema),
});
