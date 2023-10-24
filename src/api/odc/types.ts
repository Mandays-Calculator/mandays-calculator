export interface ODCListResponse {
  id: string;
  name: string;
  abbreviation: string;
  location: string;
  holidays: string[] | null;
  active: boolean;
}
