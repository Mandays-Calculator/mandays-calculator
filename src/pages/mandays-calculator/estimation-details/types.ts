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

export type TaskType = {
  id: string;
  title: string;
  description: string;
  createdDate: string;
};

export interface MandaysForm {
  summary: SummaryForm;
  resource: Resource[];
  legend: LegendColumn[];
  tasks: TaskType[];
  unselected: TaskType[];
}
