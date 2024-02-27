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

export interface GetUsersParam {
  isActive?: boolean;
  joiningStartDate?: string;
  joiningEndDate?: string;
  roles?: string;
  keyword?: string;
}

interface ODC {
  id: string;
  name: string;
  abbreviation: string;
  location: string;
  holidays: any; // You might want to specify a more specific type for holidays
  active: boolean;
}

interface Team {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  teams: Team[];
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  joiningDate: string;
  roles: string[];
  odc: ODC;
  gender: string;
  employeeId: string;
  careerStep: string;
  projects: Project[];
  active: boolean;
  fullName: string;
  suffix: string;
  image: string;
}

export interface GetUserByIdResponse {
  data: UserData;
}
