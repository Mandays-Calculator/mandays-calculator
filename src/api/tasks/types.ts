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

export interface UpdateTags {
  id: string;
  name: string;
}

export interface UpdateComments {
  id: string;
  description: string;
}

export interface CreateTask {
  name?: string;
  description?: string;
  functionality?: Functionality;
  tags?: SelectObject[];
  complexityId?: string;
  createdDate?: string;
  sprint?: string;
  comment?: Comment[];
  status?: string;
}

export interface UpdateTask {
  id?: string;
  name?: string;
  description?: string;
  functionality?: Functionality;
  tags?: UpdateTags[];
  complexityId?: string;
  createdDate?: string;
  sprint?: string;
  comment?: UpdateComments;
  status?: number;
}

export interface TaskResponse extends GenericErrorResponse {
  status: number;
  data: boolean;
}

export interface DeleteId {
  id: string;
}

export interface GetFunctionality<T> {
  data: T;
  status: number;
}

export interface ForGetFunctionality
  extends Omit<CommonFunctionality, "isActive"> {
  id: string;
  active: boolean;
}
export interface CommonFunctionality {
  id: string;
  name: string;
  description: string;
  team: {
    id: string;
    name: string;
    projectId: string;
    isActive: boolean;
    createdDate: string;
    lastUpdatedDate: string;
  };
  createdDate: string;
  lastUpdatedDate: string;
}
