import type {
  DataType,
  SprintColumnsProps,
  SprintListColumnsType,
} from "./types";

import { CellProps } from "react-table";
import { IconButton } from "@mui/material";
import { SvgIcon } from "~/components";

import LocalizationKey from "~/i18n/key";

const {
  mandaysCalculator: { sprintListTableColumns },
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
      Cell: ({ row }: CellProps<DataType>) => (
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
