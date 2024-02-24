import type { TFunction } from "i18next";
import type { Column } from "react-table";

export interface HistoryData {
  id: string;
  name: string;
  team: {
    active: boolean;
    id: string;
    lastUpdatedDate: string;
    name: string;
    projectId: string;
  };
  startDate: string;
  endDate: string;
}

export interface HistoryColumns {
  name: string;
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
