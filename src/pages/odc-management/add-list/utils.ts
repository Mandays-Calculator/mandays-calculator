import type { ODCListResponse } from "~/api/odc";
import type { FieldValue, IntValues } from "../utils";

export const AddEditFormat = (
  values: IntValues,
  fieldValues: FieldValue,
  idx: number,
): ODCListResponse[] => {
  const updatedValues = { ...values };
  const abbrValue = fieldValues.abbreviation === "" ? fieldValues.name : fieldValues.abbreviation;
  const obj = {
    id: "0",
    name: fieldValues.name,
    abbreviation: abbrValue,
    location: fieldValues.location,
    holidays: fieldValues.holidays,
    active: true,
  };

  updatedValues.odcList[idx] = obj;
  return updatedValues.odcList;
};

export const IsDuplicate = (arr: ODCListResponse[], value: string, name: string): boolean => {
  const newArr: boolean[] = [];
  arr.map((v: any) => {
    if (v[name] === value) newArr.push(true);
    else newArr.push(false);
  });

  return newArr.includes(true);
};
