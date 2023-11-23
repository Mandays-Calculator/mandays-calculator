import type { ODCListResponse } from "~/api/odc";
import type { FieldValue, IntValues } from "../utils";

export const AddEditFormat = (
  values: IntValues,
  fieldValues: FieldValue,
  idx: number,
  isEdit: boolean,
): ODCListResponse[] => {
  const updatedValues = { ...values };
  const abbrValue = fieldValues.abbreviation === "" ? fieldValues.name : fieldValues.abbreviation;
  const obj = {
    id: "0",
    name: fieldValues.name,
    abbreviation: abbrValue,
    location: fieldValues.location,
    holidays: null,
    active: true,
  };

  if (isEdit) {
    updatedValues.odcList[idx] = obj;
    return updatedValues.odcList;
  } else {
    return [obj, ...updatedValues.odcList]
  }
};
