export interface AddTeamForm {
  projectName: string;
  teams: TeamObject[];
}

export interface TeamObject {
  teamName: string;
  teamLead: string;
  // members: MemberObject[];
}

export interface MemberObject {
  name: string;
  odc: string;
  careerStep: string;
}
