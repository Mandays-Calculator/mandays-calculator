export type UserManagementForms = AddUserManagementParams &
  UpdateUserManagementParams &
  UserManagementFilterParams;

export interface UpdateUserManagementParams {
  UpdateFirstName?: string;
  UpdateLastName?: string;
  UpdateMiddleName?: string;
  UpdateSuffix?: string;
  UpdateGender?: string | number;
  UpdateEmail?: string;
  UpdateOdcId?: string;
  UpdateImage?: string;
  UpdateEmployeeId?: string;
  UpdateJoiningDate?: string;
  UpdateCareerStep?: string;
  UpdateProjectId?: string;
  UpdateTeamId?: string;
  UpdateRoles?: string[];
}
export interface AddUserManagementParams {
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  image?: string;
  gender: string | number;
  email: string;
  odcId: string;
  employeeId: string;
  joiningDate: string;
  careerStep: string;
  projectId: string;
  teamId: string;
  roles: string[];
}

export interface UserManagementFilterParams {
  filterProperty?: string;
  filterValue?: string;
}
