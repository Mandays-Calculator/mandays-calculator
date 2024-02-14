import type { User } from "../user/types";
import { GenericErrorResponse } from "../types";

export interface QueryResponse<T> {
  status: number;
  data: T;
}

export interface Functionality {
  id?: string;
  name: string;
  description?: string;
  team: Team;
  createdDate?: string | null;
  lastUpdatedDate?: string | null;
}

export interface Team {
  id: string;
  name?: string;
  projectId?: string;
  isActive?: boolean;
  createdDate?: string | null;
  lastUpdatedDate?: string | null;
}

export interface Tag {
  id?: string;
  name: string;
  createdDate?: string;
  lastUpdatedDate?: string;
}

export interface Comment {
  id?: string;
  mandaysEstimation?: MandaysEstimation;
  task: AllTasksResponse | null;
  user: User | null;
  description: string;
  createdDate?: string;
  lastUpdatedDate?: string;
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
  createdDate: string;
  lastUpdatedDate: string;
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
  createdDate?: string;
  createdBy?: string;
  lastUpdatedDate?: string;
}

export interface AllTasksResponse {
  id?: string;
  name: string;
  description: string;
  status?: string;
  functionality: Functionality;
  _functionality?: string;
  tags: Tag[];
  _tags?: string[];
  comments?: Comment[];
  mandaysEstimation?: MandaysEstimation;
  complexity: Complexity;
  _complexity?: string;
  completionDate?: string;
  createdDate?: string;
  lastUpdatedDate?: string;
  sprint: string;
}

export interface CreateOrUpdateFunctionality {
  id: string;
  name: string;
  teamId: string;
}

export interface CreateTask {
  name: string;
  description: string;
  functionality: CreateOrUpdateFunctionality;
  tags: Tag[];
  complexityId: string;
}

export interface UpdateTask {
  id: string;
  name: string;
  description: string;
  status: number;
  functionality: CreateOrUpdateFunctionality;
  tags: Tag[];
  comment?: Comment | null;
  complexityId: string;
}

export interface TaskResponse extends GenericErrorResponse {
  status: number;
  data: boolean;
}

export interface DeleteTaskId {
  id: string;
}

export interface GetFunctionality<T> {
  data: T;
  status: number;
}

export interface ForGetFunctionality extends Omit<Functionality, "isActive"> {
  id: string;
  active: boolean;
}
