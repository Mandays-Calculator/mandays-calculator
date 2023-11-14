import type { TFunction } from "i18next";
import type { Column } from "react-table";

export interface SprintListDataType {
  id: string;
  sprintName: string;
  team: string;
  startedDate: string;
  status: string;
}

export interface SummaryListDataType {
  functionality: string;
  totalManHours: string;
  totalManDays: string;
}

export interface TasksListDataType {
  tasks: string;
  complexity: string;
  i03: string;
  i04: string;
  i05: string;
  i06: string;
  i07: string;
  totalManHours: string;
}

export interface ResourcesListDataType {
  odc: string;
  resourceCount: string;
  annualLeaves: string;
}

export type SprintListColumnsType = Column<SprintListDataType> & {
  id?: string;
  disableSortBy?: boolean;
};

export type TasksListColumnsType = Column<TasksListDataType> & {
  id?: string;
};

export type SummaryListColumnsType = Column<SummaryListDataType> & {
  id?: string;
};

export type ResourcesListColumnsType = Column<ResourcesListDataType> & {
  id?: string;
};

export type SprintColumnsProps = {
  t: TFunction<"translation", undefined>;
  onViewSprintDetails: (sprintId: string) => void;
  onEditSprintDetails: (sprintId: string) => void;
  onDeleteSprintDetails: (sprintId: string) => void;
};

export type withTFunctionProps = {
  t: TFunction<"translation", undefined>;
};

export type TasksColumnsProps = {
  t: TFunction<"translation", undefined>;
};

export type LegendColumnProps = {
  t: TFunction<"translation", undefined>;
  isInput?: boolean;
};

export type LegendColumn = {
  complexity: string;
  i03: string;
  i04: string;
  i05: string;
  i06: string;
  i07: string;
};

export type ResourcesColumnsProps = {
  t: TFunction<"translation", undefined>;
  isInput?: boolean;
};
