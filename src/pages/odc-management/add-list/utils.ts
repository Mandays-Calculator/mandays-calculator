import type { OdcParam } from "~/api/odc";
// import type { FieldValue, IntValues } from "../utils";

// export const AddEditFormat = (
//   values: IntValues,
//   fieldValues: FieldValue,
//   idx: number,
// ): OdcParam[] => {
//   const updatedValues = { ...values };
//   const abbrValue = fieldValues.abbreviation === "" ? fieldValues.name : fieldValues.abbreviation;
//   const obj = {
//     id: "0",
//     name: fieldValues.name,
//     abbreviation: abbrValue,
//     location: fieldValues.location,
//     holidays: fieldValues.holidays,
//     active: true,
//     createDate: "",
//     lastUpdatedDate: "",
//   };
//   updatedValues.odcList[idx] = obj;
//   return updatedValues.odcList;
// };

export const IsDuplicate = (arr: OdcParam[], value: string, name: string): boolean => {
  const newArr: boolean[] = [];
  arr.map((v: any) => {
    if (v[name] === value) newArr.push(true);
    else newArr.push(false);
  });

  return newArr.includes(true);
};
