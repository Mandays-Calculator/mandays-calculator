export interface AddTeamForm {
  projectName: string;
  teams: TeamObject[];
}

export interface TeamObject {
  teamName: string;
  teamLead: string;
  teamMembers: MemberObject[];
}

export interface MemberObject {
  name: string;
}
