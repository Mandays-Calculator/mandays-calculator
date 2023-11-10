import type { TFunction } from "i18next";
import type { Column } from "react-table";

export type SprintListColumnsType = Column<DataType> & {
  id?: string;
  disableSortBy?: boolean;
};

export type SprintColumnsProps = {
  t: TFunction<"translation", undefined>;
  onViewSprintDetails: (sprintId: string) => void;
  onEditSprintDetails: (sprintId: string) => void;
  onDeleteSprintDetails: (sprintId: string) => void;
};

export type LegendColumn = {
  complexity: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
}

export interface DataType {
  id: string;
  sprintName: string;
  team: string;
  startedDate: string;
  status: string;
}
