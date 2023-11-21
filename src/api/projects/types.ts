export interface ProjectResponse {
  project_id: string;
  name: string;
  is_active: number;
  date_created: string;
  last_updated_date: string;
  projectId: string;
  project_team: ProjectTeam[];
}

export interface ProjectTeam {
  project_id: string;
  team_name: string;
  team_id: string;
  team_members: TeamMembers[];
}

export interface TeamMembers {
  member_id: string;
  name: string;
  lead_name: string;
  team_id: string;
  project_id: string;
}
