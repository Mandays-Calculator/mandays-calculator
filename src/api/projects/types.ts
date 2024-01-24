import { OdcParam } from '../odc';
import { User } from '../user';

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
  name: string;
  teamId: string;
  teamLead: User;
  isActive: number;
  teamMembers: TeamMembers[] | null;
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
  keycloakId: string;
  odc: OdcParam;
  active: boolean;
  createdDate: string;
  lastUpdatedDate: string;
  teamLead: boolean;
}

export interface ProjectErrorResponse {
  status: number;
  errorCode: string;
  message: string;
}

export interface AddProjectType {
  name: string;
  active: boolean;
  dateCreated: number;
  lastUpdatedDate: number;
  teams: {
    teamName: string;
    teamLead: SelectObject | string;
    active: boolean;
    dateCreated: number;
    lastUpdatedDate: number;
    teamMembers: string[];
  }[];
}

export interface AddProjectErrorType {
  errorCode: string;
  message: string;
}

export interface AddProjectSuccessType {
  data: {
    headers: {};
    body: Project;
    statusCode: string;
    statusCodeValue: number | 200;
  };
}
