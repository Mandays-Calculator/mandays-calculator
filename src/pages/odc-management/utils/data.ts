export const NewODCData = {
  id: "",
  name: "",
  location: "",
  abbreviation: "",
  holidays: null,
  active: true,
  createdDate: null,
  lastUpdatedDate: null,
};

export const NewHolidayData = {
  id: 0,
  odcId: "",
  recurring: "false",
  name: "",
  createdDate: null,
  lastUpdatedDate: null,
};

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
