import type { CareerSteps, Status, Team } from "~/api/common";
import type { Complexity } from "~/api/tasks";
import type { Gender, Role } from "../user";
import type { OdcParam } from "../odc";

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

interface Summary {
  projectId: string;
  teamId: string;
  estimationName: string;
  utilizationRate: number | string;
  startDate: string;
  endDate: string;
}

export interface ResourceDetails {
  id: number;
  odcId: string;
  numberOfResources: number;
  annualLeaves: number;
}

interface Estimation {
  taskId: string;
  task: string;
  complexityId: string;
  complexity: string;
  resourceCountByTasks: {
    [key: number]: number;
  };
}

interface Phase {
  id: string;
  name: string;
  functionalities: [
    {
      id: string;
      name: string;
      estimations: Estimation[];
    },
  ];
}

export interface EstimationDetailResponse {
  summary: Summary;
  resources: {
    [key: number]: ResourceDetails[];
  };
  legends: {
    [key: string]: {
      careerStep: string;
      manHours: number;
    }[];
  };
  phases: Phase[];
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    joiningDate: string;
    roles: Role[];
    odc: OdcParam;
    gender: Gender;
    employeeId: string;
    careerStep: CareerSteps;
    active: boolean;
    fullName: string;
  };
}

export interface CreateEstimationParam {
  createdBy: string;
  basicInfo: Summary;
  resources: {
    [key: number]: ResourceDetails[];
  };
  legends: {
    [key: string]: {
      careerStep: string;
      manHours: number;
    }[];
  };
  phases: Phase[];
}
