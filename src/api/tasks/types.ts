export interface QueryResponse<T> {
  status: number;
  data: T;
}

interface Comment {
  name: string;
  comment: string;
}

interface Functionality {
  id: string;
  name: string;
}

export interface AllTasksResponse {
  taskID: string;
  name: string;
  description: string;
  completion_date: string;
  sprint: string;
  complexity: string;
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
