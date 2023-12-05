import type { TFunction } from "i18next";
import type { Column } from "react-table";

export interface HistoryData {
  id: string;
  sprintName: string;
  team: string;
  startDate: string;
  endDate: string;
}

export interface HistoryColumns {
  sprintName: string;
  team: string;
  startedDate: string;
  endDate: string;
}

export interface HistoryColumnsProps {
  t: TFunction<"translation", undefined>;
  onViewSprintDetails: (sprintId: string) => void;
}

export type HistoryColumnsType = Column<HistoryData> & {
  id?: string;
  disableSortBy?: boolean;
};
