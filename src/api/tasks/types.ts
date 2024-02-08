import type { User } from "../user/types";
import { GenericErrorResponse } from "../types";

export interface QueryResponse<T> {
  status: number;
  data: T;
}

export interface Functionality {
  id: string;
  name: string;
  description?: string;
  team: Team;
  createdDate?: Date;
  lastUpdatedDate?: Date;
}

export interface Team {
  id: string;
  name?: string;
  projectId?: string;
  isActive?: boolean;
  createdDate?: Date;
  lastUpdatedDate?: Date;
}

export interface Tag {
  id: string;
  name: string;
  createdDate?: Date;
  lastUpdatedDate?: Date;
}

export interface Comment {
  id?: string;
  mandaysEstimation?: MandaysEstimation;
  task: AllTasksResponse | null;
  user: User | null;
  description: string;
  createdDate?: Date;
  lastUpdatedDate?: Date;
}
export interface MandaysEstimation {
  id: string;
  name: string;
  projectId: string;
  teamId: string;
  createdBy: string;
  status: number;
  startDate: string;
  endDate: string;
  estUtilizationRate: number;
  createdDate: Date;
  lastUpdatedDate: Date;
}

export interface Complexity {
  id: string;
  name?: string;
  minHours?: string;
  maxHours?: string;
  minFeatures?: string;
  maxFeatures?: string;
  description?: string;
  sample?: string;
  isActive?: boolean;
  createdDate?: Date;
  createdBy?: string;
  lastUpdatedDate?: Date;
}

export interface AllTasksResponse {
  id?: string;
  name: string;
  description: string;
  status?: string;
  functionality: Functionality;
  tags: Tag[];
  comments?: Comment[];
  mandaysEstimation?: MandaysEstimation;
  complexity: Complexity;
  completionDate?: string;
  createdDate?: Date;
  lastUpdatedDate?: Date;
  sprint: string;
}

export interface CreateTask {
  name: string;
  description: string;
  functionality: Functionality;
  tags: Tag[];
  complexityId: Complexity;
}

export interface TaskResponse extends GenericErrorResponse {
  status: number;
  data: boolean;
}

export interface DeleteTaskId {
  id: string;
}
