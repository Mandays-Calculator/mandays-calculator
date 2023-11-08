export interface UserListResponse {
  status: number;
  data: UserListData[];
}

interface UserListData {
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
  roles: string;
  active: boolean;
}
export interface AddUserResponse {
  status: number;
  data: {};
}

export interface AddUserParams {
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string | number;
  gender: string | number;
  email: string;
  careerStep: string;
  joiningDate: string;
  projectId: string;
  teamId: string;
  roles: string[];
}
