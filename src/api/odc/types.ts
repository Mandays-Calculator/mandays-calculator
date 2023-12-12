export interface ODCListResponse {
  id?: string;
  name: string;
  abbreviation: string;
  location: string;
  holidays: HolidayType[] | null;
  active: boolean;
}

export type HolidayType = {
  date: string;
  holiday: string;
  active: boolean;
};

export interface ODCSubmit {
  name: string;
  abbreviation: string;
  location: string;
  holidays: HolidayType[] | null;
  active: boolean;
}
