import moment from "moment";
import { range, isNull } from "lodash";

export const getCurrentYear = (): number => {
  return moment(new Date()).year() + 1;
};

export const getYears = (): number[] => {
  return range(1900, getCurrentYear(), 1);
};

export const getMonths = (): string[] => {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
};

export const getMonth = (date: Date): string => {
  return getMonths()[date.getMonth()];
};

export const getYear = (date: Date): number => {
  return moment(date).year();
};

type FormatDataReturnProp = string;
type FormatDataProp = Date | Date[];

export const formatData = (val: FormatDataProp): FormatDataReturnProp => {
  if (Array.isArray(val)) {
    const startDate = isNull(val[0]) ? "" : moment(val[0]).format("DD/MM/YYYY");
    const endDate = isNull(val[1]) ? "" : moment(val[1]).format("DD/MM/YYYY");
    return `${startDate} - ${endDate}`;
  } else if (Object.prototype.toString.call(val) !== "[object Date]") {
    return "";
  } else {
    return moment(val).format("DD/MM/YYYY");
  }
};

export const checkDateFormat = (date: string): boolean => {
  const regExDate = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])&/;
  return regExDate.test(date);
};
