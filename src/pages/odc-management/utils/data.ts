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
    date: "01/01/2023",
    holiday: "New Year's Day"
  },
  {
    date: "01/22/2023",
    holiday: "Lunar New Year"
  }
];
