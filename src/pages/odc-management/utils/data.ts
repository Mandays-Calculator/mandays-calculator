import type { ODCListResponse, ODCSubmit } from "~/api/odc";

export const NewODCData = {
  id: "",
  name: "",
  location: "",
  abbreviation: "",
  holidays: [],
  active: true,
};

export const NewHolidayData = {
  date: "",
  holiday: "",
  active: true,
};

export const SubmitFormat = (data: ODCListResponse): ODCSubmit => {
  return {
    name: data.name,
    abbreviation: data.abbreviation,
    location: data.location,
    holidays: data.holidays,
    active: data.active,
  };
};

export const FakeHoliday = [
  {
    date: "2023-01-01 00:00:00",
    holiday: "New Year's Day",
    active: true
  },
  {
    date: "2023-01-22 00:00:00",
    holiday: "Lunar New Year",
    active: true
  }
];
