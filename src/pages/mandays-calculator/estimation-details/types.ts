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
  odc: string;
  resourceCount: string;
  annualLeaves: string;
}
interface SummaryForm {
  name: string;
  team: string;
  utilRate: string;
  startDate: string;
  endDate: string;
}

type LegendColumn = {
  complexity: string;
  i03: string;
  i04: string;
  i05: string;
  i06: string;
  i07: string;
};

export type Status = "selected" | "unselected";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  status?: Status;
};

export interface MandaysForm {
  summary: SummaryForm;
  resource: Resource[];
  legend: LegendColumn[];
  tasks: TaskType[];
}
