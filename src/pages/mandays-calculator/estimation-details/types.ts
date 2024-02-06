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

export interface MandaysForm {
  summary: SummaryForm;
  resource: Resource;
  legends: LegendColumn;
  tasks: TaskType[];
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
