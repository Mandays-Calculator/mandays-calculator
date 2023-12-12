export interface QueryResponse<T> {
  status: number;
  data: T;
}

interface Comment {
  name: string;
  comment: string;
}

export interface AllTasksResponse {
  name: string;
  description: string;
  completion_date: string;
  sprint: string;
  complexity: string;
  status: string;
  type: string;
  functionality: string;
  comments: Comment[];
}

export interface CreateTask {
  name: string;
  description: string;
  functionality: string;
  tags: SelectObject[];
  complexity: string;
}
