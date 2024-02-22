import type { TeamMembers } from "~/api/projects";
import { Gender } from "~/api/user";

export interface AddTeamForm {
  projectName: string;
  teams: TeamObject[];
}

export interface TeamLead {
  active?: boolean;
  careerStep?: string;
  email?: string;
  employeeId?: string;
  firstName?: string;
  fullName?: string;
  gender?: Gender;
  id?: string;
  joiningDate?: number;
  lastName?: string;
  middleName?: string | null;
}

export interface TeamObject {
  id?: string;
  projectId?: string;
  teamId?: string;
  active?: boolean;
  dateCreated?: string;
  lastUpdatedDate?: string;
  teamName: string;
  teamLead: SelectObject;
  teamMembers: TeamMembers[];
}
