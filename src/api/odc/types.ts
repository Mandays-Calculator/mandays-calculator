import { GenericErrorResponse } from "../types";

//ODC
export interface OdcParam {
  id: string;
  name: string;
  abbreviation: string;
  location: string;
  holidays: HolidayParam[] | null;
  active: string;
  createDate: string | null;
  lastUpdatedDate: string | null;
};

export interface CreateOdcParam extends Omit<OdcParam, "id"> {};

export interface UpdateOdcParam extends Omit<OdcParam, "holidays"> {};

export interface OdcResponse extends GenericErrorResponse {
  status: number;
};

export interface OdcListResponse extends OdcResponse {
  data: OdcParam[];
};

//Holidays
export interface HolidayParam {
  id: string;
  odcId: string;
  date: string;
  recurring: string;
  name: string;
  createDate: string | null;
  lastUpdatedDate: string | null;
};

export interface CreateHolidayParam extends Omit<HolidayParam, "id"> {};

export interface UpdateHolidayParam extends HolidayParam {};

export interface HolidayResponse extends GenericErrorResponse {
  status: number;
};

export interface HolidayListResponse extends HolidayResponse {
  data: HolidayParam[];
};

export interface CreateHoliday extends Omit<DeleteHoliday, "id"> {
  data: CreateHolidayParam[];
};

export interface UpdateHoliday {
  data: UpdateHolidayParam;
};

export interface DeleteHoliday {
  id: string;
  odcId: string;
};
