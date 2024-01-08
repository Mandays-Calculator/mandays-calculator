export interface Task {
    taskID: string;
    taskTitle: string;
    desc: string;
    date: string;
    sprint: string;
    complexity: string;
    status: string;
    type: string;
    functionality: string;
    tags: string[];
    comments: {
        name: string;
        comment: string;
    }[];
}