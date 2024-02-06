import { GenericErrorResponse } from "../types";

export interface QueryResponse<T> {
  status: number;
  data: T;
}

export interface Comment {
  name: string;
  comment: string;
}

export interface Functionality {
  id?: string;
  name?: string;
  teamId?: string;
}

export interface Complexity {
  active?: boolean;
  description?: string;
  id?: string;
  name?: string;
  numberOfFeatures?: string;
  numberOfHours?: string;
  sample?: string;
}

export interface AllTasksResponse {
  taskID?: string | null;
  id?: string;
  name?: string;
  description?: string;
  createdDate?: string;
  completionDate?: string;
  sprint?: string;
  complexity: Complexity;
  status?: string;
  type?: string;
  tags?: SelectObject[];
  functionality?: Functionality;
  comments?: Comment[];
}

export interface CreateTask {
  name?: string;
  description?: string;
  functionality?: Functionality;
  tags?: SelectObject[];
  complexityId?: Complexity;
  createdDate?: string;
  sprint?: string;
}

export interface TaskResponse extends GenericErrorResponse {
  status: number;
  data: boolean;
}

export interface DeleteId {
  id: string;
}
