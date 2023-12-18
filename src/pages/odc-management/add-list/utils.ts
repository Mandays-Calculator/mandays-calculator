import type { OdcParam, CreateOdcParam, UpdateOdcParam } from "~/api/odc";

export const IsDuplicate = (
  arr: OdcParam[],
  value: string,
  name: string,
  id: string
): boolean => {
  const newArr: boolean[] = [];
  arr.map((v: any) => {
    if (v[name] === value && v["id"] !== id) newArr.push(true);
    else newArr.push(false);
  });

  return newArr.includes(true);
};

export const AddFormat = (obj: OdcParam): CreateOdcParam => {
  return {
    name: obj.name,
    abbreviation: obj.abbreviation,
    location: obj.location,
    holidays: obj.holidays,
    active: obj.active,
    createDate: obj.createDate,
    lastUpdatedDate: obj.lastUpdatedDate,
  };
};

export const EditFormat = (obj: OdcParam): UpdateOdcParam => {
  return {
    id: obj.id,
    name: obj.name,
    abbreviation: obj.abbreviation,
    location: obj.location,
    active: obj.active,
    createDate: obj.createDate,
    lastUpdatedDate: obj.lastUpdatedDate,
  };
};
