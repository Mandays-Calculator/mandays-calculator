import { CellProps } from "react-table";
import type {
  HistoryColumnsProps,
  HistoryColumnsType,
  HistoryData,
} from "./types";

import { CustomButton } from "~/components/form/button";

import LocalizationKey from "~/i18n/key";

const {
  mandaysCalculator: { sprintListTableColumns },
  history,
} = LocalizationKey;

export const HistoryColumns = ({
  t,
  onViewSprintDetails,
}: HistoryColumnsProps): HistoryColumnsType[] => {
  return [
    {
      Header: t(sprintListTableColumns.sprintName),
      accessor: "name",
    },
    {
      Header: t(sprintListTableColumns.team),
      accessor: "team",
      Cell: ({ row }) => <>{row.original.team.name}</>,
    },
    {
      Header: t(sprintListTableColumns.startedDate),
      accessor: "startDate",
    },
    {
      Header: "",
      id: "actions",
      Cell: ({ row }: CellProps<HistoryData>) => (
        <CustomButton onClick={() => onViewSprintDetails(row.original.id)}>
          {t(history.detailsBtn)}
        </CustomButton>
      ),
    },
  ];
};
