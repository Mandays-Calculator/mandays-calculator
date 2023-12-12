export interface ODCListResponse {
  id?: string;
  name: string;
  abbreviation: string;
  location: string;
  holidays: HolidayType[] | null;
  active: boolean;
  createDate: string | null;
  lastUpdatedDate: string | null;

}

export type HolidayType = {
  id: number;
  odcId: string;
  date: string;
  recurring: boolean;
  name: string;
  createDate: string | null;
  lastUpdatedDate: string | null;
};

export interface ODCSubmit {
  name: string;
  abbreviation: string;
  location: string;
  holidays: HolidayType[] | null;
  active: boolean;
}
