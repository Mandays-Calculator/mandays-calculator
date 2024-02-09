import { CareerSteps } from "~/api/common";
import { TasksResponse } from "~/api/mandays-est-tool";
import { CommonOption } from "~/queries/common/options";

export type EstimationDetailsMode = "edit" | "add" | "view";

export interface EstimationDetailsProps {
  isExposed?: boolean;
}
export type ExportFormValues = {
  exportBy: string;
};

export type ShareFormValues = {
  shareBy: string;
  expiredIn: string;
  timeType: string;
};

interface Resource {
  [key: string]: {
    odcId: string;
    numberOfResources: number;
    annualLeaves: number;
  }[];
}

interface SummaryForm {
  estimationName: string;
  teamId: string;
  utilizationRate: number | string;
  startDate: string;
  endDate: string;
}

type LegendColumn = {
  [key: string]: {
    careerStep: CareerSteps;
    manHours: number;
  }[];
};

export type Status = "selected" | "unselected";

export interface TaskType extends TasksResponse {
  dndStatus: Status;
}

interface ResourceCountByTasks {
  taskId: string;
  complexityId: string;
  resourceCountByTasks: {
    I03: number;
    I04: number;
    I05: number;
    I06: number;
    I07: number;
  };
}

export interface Estimations {
  task: string;
  taskId: string;
  complexityId: string;
  complexity: string;
  resourceCountByTasks: {
    I03: number;
    I04: number;
    I05: number;
    I06: number;
    I07: number;
  };
}

export interface Functionalites {
  id: string;
  name: string;
  estimations: Estimations[];
}

export interface Phase {
  id: string;
  name: string;
  functionalities: Functionalites[];
}

export interface CreatePhase {
  name: string;
  resourceCountByTasks: ResourceCountByTasks[];
}

export interface MandaysForm {
  summary: SummaryForm;
  resources: Resource;
  legends: LegendColumn;
  tasks: TaskType[];
  phases: Phase[];
}
export interface ReviewSummaryType extends MandaysForm {
  sprintName: string;
  mode: EstimationDetailsMode;
}

export interface ApiCommonOptions {
  careerSteps?: CommonOption;
  odc?: CommonOption;
  complexities?: CommonOption;
}
