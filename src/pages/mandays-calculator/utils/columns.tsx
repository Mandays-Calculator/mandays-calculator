import type {
  TasksColumnsProps,
  TasksListColumnsType,
  SprintColumnsProps,
  SprintListColumnsType,
  SprintListDataType,
  SummaryListColumnsType,
} from "./types";

import { CellProps } from "react-table";
import { IconButton } from "@mui/material";
import { SvgIcon } from "~/components";

import LocalizationKey from "~/i18n/key";

const {
  mandaysCalculator: {
    sprintListTableColumns,
    summaryTableColumns,
    tasksTableColumns,
  },
} = LocalizationKey;

export const SprintListColumns = ({
  t,
  onViewSprintDetails,
  onEditSprintDetails,
  onDeleteSprintDetails,
}: SprintColumnsProps): SprintListColumnsType[] => {
  return [
    {
      Header: t(sprintListTableColumns.sprintName),
      accessor: "sprintName",
    },
    {
      Header: t(sprintListTableColumns.team),
      accessor: "team",
    },
    {
      Header: t(sprintListTableColumns.startedDate),
      accessor: "startedDate",
    },
    {
      Header: t(sprintListTableColumns.status),
      accessor: "status",
      disableSortBy: true,
    },
    {
      Header: "",
      id: "actions",
      Cell: ({ row }: CellProps<SprintListDataType>) => (
        <>
          <IconButton onClick={() => onViewSprintDetails(row.original.id)}>
            <SvgIcon name="history" $size={2} color="primary" />
          </IconButton>
          <IconButton onClick={() => onEditSprintDetails(row.original.id)}>
            <SvgIcon name="edit" $size={2} color="primary" />
          </IconButton>
          <IconButton onClick={() => onDeleteSprintDetails(row.original.id)}>
            <SvgIcon name="delete" $size={2} color="error" />
          </IconButton>
        </>
      ),
    },
  ];
};

export const SummaryListColumns = ({
  t,
}: TasksColumnsProps): SummaryListColumnsType[] => {
  return [
    {
      Header: t(summaryTableColumns.functionality),
      accessor: "functionality",
    },
    {
      Header: t(summaryTableColumns.totalManHours),
      accessor: "totalManHours",
    },
    {
      Header: t(summaryTableColumns.totalManDays),
      accessor: "totalManDays",
    },
  ];
};

export const TasksListColumns = ({
  t,
}: TasksColumnsProps): TasksListColumnsType[] => {
  return [
    {
      Header: t(tasksTableColumns.tasks),
      accessor: "tasks",
    },
    {
      Header: t(tasksTableColumns.complexity),
      accessor: "complexity",
    },
    {
      Header: t(tasksTableColumns.i03),
      accessor: "i03",
    },
    {
      Header: t(tasksTableColumns.i04),
      accessor: "i04",
    },
    {
      Header: t(tasksTableColumns.i05),
      accessor: "i05",
    },
    {
      Header: t(tasksTableColumns.i06),
      accessor: "i06",
    },
    {
      Header: t(tasksTableColumns.i07),
      accessor: "i07",
    },
    {
      Header: t(summaryTableColumns.totalManHours),
      accessor: "totalManHours",
    },
  ];
};
