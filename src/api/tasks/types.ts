export interface QueryResponse<T> {
  status: number;
  data: T;
}

export interface Comment {
  name: string;
  comment: string;
}

interface Functionality {
  id: string;
  name: string;
}

interface Complexity {
  active: boolean;
  description: string;
  id: string;
  name: string;
  numberOfFeatures: string;
  numberOfHours: string;
  sample: string;
}

export interface AllTasksResponse {
  taskID: string;
  name: string;
  description: string;
  createdDate: string;
  completionDate: string;
  sprint: string;
  complexity: Complexity;
  status: string;
  type: string;
  tags: SelectObject[];
  functionality: Functionality;
  comments: Comment[];
}

export interface CreateTask {
  name: string;
  description: string;
  functionality: string;
  tags: SelectObject[];
  complexity: string;
}
