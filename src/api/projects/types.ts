export interface ProjectListResponse {
  status: number;
  data: Project[];
}
export interface Project {
  projectId: string;
  name: string;
  active: number;
  dateCreated: string;
  lastUpdatedDate: string;
  teams: Teams[];
}

export interface Teams {
  projectId: string;
  teamName: string;
  teamId: string;
  teamLead: string;
  isActive: number;
  teamMembers: TeamMembers[];
}

export interface TeamMembers {
  id: string;
  firstPage: number;
  lastPage: number;
  maxResults: number;
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  gender: string;
  email: string;
  employeeId: string;
  careerStep: string;
  odcId: string;
  isActive: boolean;
  joiningDate: string;
  projectId: string;
  teamId: string;
  roles: string;
  keyword: string;
  joiningStartDate: string;
  joiningEndDate: string;
}

export interface ProjectErrorResponse {
  status: number;
  errorCode: string;
  message: string;
}
