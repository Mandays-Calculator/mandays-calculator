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
  recurring: "true",
  name: "",
  createDate: null,
  lastUpdatedDate: null,
};

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
  isOdcError: false,
  isHolidayError: false,
  isAddOdcError: false,
  isAddOdcSuccess: false,
  isUpdateOdcError: false,
  isUpdateOdcSuccess: false,
  isDeleteOdcError: false,
  isDeleteOdcSuccess: false,
  isAddHolidayError: false,
  isAddHolidaySuccess: false,
  isUpdateHolidayError: false,
  isUpdateHolidaySuccess: false,
  isDeleteHolidayError: false,
  isDeleteHolidaySuccess: false,
};
