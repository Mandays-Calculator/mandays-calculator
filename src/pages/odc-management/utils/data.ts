// import type { OdcListResponse } from "~/api/odc";

export const NewODCData = {
  id: "",
  name: "",
  location: "",
  abbreviation: "",
  holidays: null,
  active: "true",
  createDate: null,
  lastUpdatedDate: null,
};

export const NewHolidayData = {
  id: "",
  odcId: "",
  date: "",
  recurring: "true",
  name: "",
  createDate: null,
  lastUpdatedDate: null,
};

// export const SubmitFormat = (data: OdcListResponse): ODCSubmit => {
//   return {
//     name: data.name,
//     abbreviation: data.abbreviation,
//     location: data.location,
//     holidays: data.holidays,
//     active: data.active,
//   };
// };

export const FakeHoliday = [
  {
    id: "1",
    odcId: "",
    date: "2023-01-01",
    recurring: "true",
    name: "New Year's Day",
    createDate: null,
    lastUpdatedDate: null,
  },
  {
    id: "2",
    odcId: "",
    date: "2023-01-22",
    recurring: "true",
    name: "Lunar New Year",
    createDate: null,
    lastUpdatedDate: null,
  }
];

export const SucErrData = {
  isError: false,
  isAddError: false,
  isAddSuccess: false,
  isUpdateError: false,
  isUpdateSuccess: false,
  isDeleteError: false,
  isDeleteSuccess: false,
};
