import type { TeamMembers } from '~/api/projects';

export interface AddTeamForm {
  projectName: string;
  teams: TeamObject[];
}

export interface TeamObject {
  projectId?: string;
  teamId?: string;
  active?: boolean;
  dateCreated?: string;
  lastUpdatedDate?: string;
  teamName: string;
  teamLead: string;
  teamMembers: TeamMembers[];
}
