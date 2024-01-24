export type UserManagementForms = AddUserManagementParams &
  UpdateUserManagementParams &
  UserManagementFilterParams;

export interface UpdateUserManagementParams {
  updateFirstName?: string;
  updateLastName?: string;
  updateMiddleName?: string;
  updateSuffix?: string;
  updateGender?: string;
  updateEmail?: string;
  updateOdcId?: string;
  updateImage?: string;
  updateEmployeeId?: string;
  updateJoiningDate?: string;
  updateCareerStep?: string;
  updateProjectId?: string;
  updateTeamId?: string;
  updateRoles?: string[];
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
  recentlyJoinedlaterDate?: boolean;
}
