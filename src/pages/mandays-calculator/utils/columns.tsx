import type {
  TasksColumnsProps,
  TasksListColumnsType,
  SprintColumnsProps,
  SprintListColumnsType,
  SprintListDataType,
} from "./types";

import { CellProps } from "react-table";
import { IconButton } from "@mui/material";
import { SvgIcon } from "~/components";

import LocalizationKey from "~/i18n/key";

const {
  mandaysCalculator: { sprintListTableColumns, summaryTableColumns },
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
export const TasksListColumns = ({
  t,
}: TasksColumnsProps): TasksListColumnsType[] => {
  return [
    {
      Header: "Tasks",
      accessor: "tasks",
    },
    {
      Header: "Complexity",
      accessor: "complexity",
    },
    {
      Header: "I03",
      accessor: "i03",
    },
    {
      Header: "I03",
      accessor: "i04",
    },
    {
      Header: "I03",
      accessor: "i05",
    },
    {
      Header: "I03",
      accessor: "i06",
    },
    {
      Header: "I07",
      accessor: "i07",
    },
    {
      Header: t(summaryTableColumns.totalManHours),
      accessor: "totalManHours",
    },
  ];
};
