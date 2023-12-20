import type { OdcParam, CreateOdcParam, UpdateOdcParam, CreateHoliday, HolidayParam } from "~/api/odc";

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

export const AddHolidayFormat = (obj: OdcParam): CreateHoliday => {
  const arr: {
    odcId: string;
    date: string;
    recurring: string;
    name: string;
    createDate: string | null;
    lastUpdatedDate: string | null;
  }[] = [];

  obj.holidays?.map((param: HolidayParam) => {
    arr.push({
      odcId: param.odcId,
      date: param.date,
      recurring: param.recurring,
      name: param.name,
      createDate: param.createDate,
      lastUpdatedDate: param.lastUpdatedDate,
    });
  });

  return {
    odcId: obj.id,
    data: arr,
  };
};
