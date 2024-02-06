import type { Status, Team } from "~/api/common";
import type { Complexity } from "~/api/tasks";

export interface EstimationResponse {
  id: string;
  name: string;
  team: Team;
  startDate: string;
  endDate: string;
  status: Status;
}

export interface Tags {
  id: string;
  name: string;
}
export interface TasksResponse {
  id: string;
  name: string;
  description: string;
  status: string;
  functionality: Functionality;
  tags: Tags[];
  comments: Comments[];
  sprint: string;
  completionDate: string;
  createdDate: string;
  complexity: Complexity;
}

interface Functionality {
  id: string;
  name: string;
}

interface Comments {
  id: string;
  description: string;
}
