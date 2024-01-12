import type { TeamMembers } from '~/api/projects';

export interface AddTeamForm {
  projectName: string;
  teams: TeamObject[];
}

export interface TeamObject {
  teamName: string;
  teamLead: string;
  teamMembers: TeamMembers[];
}
