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
  employeeId: string;
  suffix?: string;
  gender: string;
  email: string;
  careerStep: string;
  joiningDate: string;
  roles: string[];
  active: boolean;
  image?: string;
}
export interface AddUserResponse {
  status: number;
  data: {};
}

export interface AddUserParams {
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  gender: string | number;
  email: string;
  careerStep: string;
  employeeId: string;
  odcId: string;
  joiningDate: string;
  projectId: string;
  teamId: string;
  roles: string[];
  image?: string;
}

export interface DeleteUserResponse {
  status: number;
  data: boolean;
}

export interface DeleteUserParam {
  id: string;
}
