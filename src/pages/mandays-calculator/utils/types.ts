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

export interface DataType {
  id: string;
  sprintName: string;
  team: string;
  startedDate: string;
  status: string;
}
