export interface UserListResponse {
  status: number;
  data: UserListData[];
}

export interface UserListData {
  id: string;
  odc: {
    id: string;
    name: string;
    abbreviation: string;
    location?: string;
    active: boolean;
  };
  firstName: string;
  lastName: string;
  middleName?: string;
  suffix?: string;
  gender: string;
  email: string;
  careerStep: string;
  joiningDate: string;
  roles: string[];
  active: boolean;
}
