import type { OdcParam, CreateOdcParam, UpdateOdcParam, CreateHoliday, HolidayParam } from "~/api/odc";

import moment from "moment";

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
  const arr: {
    odcId: string;
    date: string;
    recurring: string;
    name: string;
    createdDate: string | null;
    lastUpdatedDate: string | null;
  }[] = [];
  const cDate = moment().format("YYYY-MM-DD HH:MM:SS.S");

  if (
    (obj.holidays !== undefined && obj.holidays !== null) &&
    obj.holidays?.length > -1
  ) {
    obj.holidays?.map((value: HolidayParam) => {
      const date = moment(value.date).format("YYYY-MM-DD");
      arr.push({
          odcId: value.odcId,
          date: date,
          recurring: value.recurring,
          name: value.name,
          createdDate: cDate,
          lastUpdatedDate: value.lastUpdatedDate,
        });
    });
  }

  return {
    name: obj.name,
    abbreviation: obj.abbreviation,
    location: obj.location,
    holidays: arr,
    active: obj.active,
    createdDate: cDate,
    lastUpdatedDate: obj.lastUpdatedDate,
  };
};

export const EditFormat = (obj: OdcParam): UpdateOdcParam => {
  const date = moment().format("YYYY-MM-DD HH:MM:SS.S");

  return {
    id: obj.id,
    name: obj.name,
    abbreviation: obj.abbreviation,
    location: obj.location,
    active: obj.active,
    createdDate: obj.createdDate,
    lastUpdatedDate: date,
  };
};

export const AddHolidayFormat = (obj: OdcParam): CreateHoliday => {
  const arr: {
    odcId: string;
    date: string;
    recurring: string;
    name: string;
    createdDate: string | null;
    lastUpdatedDate: string | null;
  }[] = [];
  const cDate = moment().format("YYYY-MM-DD HH:MM:SS.S");

  obj.holidays?.map((param: HolidayParam) => {
    const date = moment(param.date).format("YYYY-MM-DD");

    if (param.id === 0)
      arr.push({
        odcId: param.odcId,
        date: date,
        recurring: param.recurring,
        name: param.name,
        createdDate: cDate,
        lastUpdatedDate: param.lastUpdatedDate,
      });
  });

  return {
    odcId: obj.id,
    data: arr,
  };
};

export const AddHoliday = (odcId: string) => {
  return {
    id: 0,
    odcId: odcId,
    recurring: "true",
    name: "",
    createDate: null,
    lastUpdatedDate: null,
  };
}

export function removeItem<T>(arr: Array<T>, value: T): Array<T> { 
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
