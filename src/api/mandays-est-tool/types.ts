import { Status } from "~/api/common";

interface TeamLead {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  employeeId: string;
  active: boolean;
  fullName: string;
}

interface Team {
  projectId: string;
  name: string;
  id: string;
  teamLead: TeamLead;
  active: boolean;
  lastUpdatedDate: string;
}

export interface EstimationResponse {
  id: string;
  name: string;
  team: Team;
  startDate: string;
  endDate: string;
  status: Status;
}
export interface TasksResponse {
  id: string;
  name: string;
  description: string;
  status: string;
  functionality: Functionality;
  tags: string;
  comments: Comments[];
  sprint: string;
  completionDate: string;
  createdDate: string;
}

interface Functionality {
  id: string;
  name: string;
}

interface Comments {
  id: string;
  description: string;
}
