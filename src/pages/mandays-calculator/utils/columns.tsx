import type { Column } from "react-table";
import type { ReactElement } from "react";
import type {
  TasksColumnsProps,
  TasksListColumnsType,
  SprintColumnsProps,
  ResourcesColumnsProps,
  SprintListColumnsType,
  SprintListDataType,
  SummaryListColumnsType,
  ResourcesListColumnsType,
  LegendColumn,
  LegendColumnProps,
  ResourcesListDataType,
  EstimationColumn,
  EstimationSubColumn,
  EstimationColumnProps,
} from "./types";

import { CellProps } from "react-table";
import { IconButton } from "@mui/material";
import { ControlledNumberInput } from "~/components/form/controlled";
import { SvgIcon, Table } from "~/components";
import renderStatus from "~/utils/helpers/renderStatusHelper";

import LocalizationKey from "~/i18n/key";

const {
  mandaysCalculator: {
    sprintListTableColumns,
    summaryTableColumns,
    tasksTableColumns,
    resourceListTableColumns,
    estimation: { estimationColumns },
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
      accessor: "name",
    },
    {
      Header: t(sprintListTableColumns.team),
      accessor: "team",
      Cell: ({ row: { original } }: CellProps<SprintListDataType>) => {
        console.log(original);
        return original.team?.name;
      },
    },
    {
      Header: t(sprintListTableColumns.startedDate),
      accessor: "startDate",
    },
    {
      Header: t(sprintListTableColumns.status),
      accessor: "status",
      disableSortBy: true,
      Cell: ({ row: { original } }: CellProps<SprintListDataType>) => {
        console.log(original);
        return renderStatus(original.status);
      },
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

export const LegendListColumns = ({
  t,
  isInput,
}: LegendColumnProps): Column<LegendColumn>[] => {
  return [
    {
      Header: t(tasksTableColumns.complexity),
      accessor: "complexity",
    },
    {
      Header: t(tasksTableColumns.i03),
      Cell: ({ row, row: { index } }: CellProps<LegendColumn>) =>
        isInput ? (
          <>
            <ControlledNumberInput name={`legend.${index}.i03`} />
          </>
        ) : (
          <> {row.original.i03} </>
        ),
      accessor: "i03",
    },
    {
      Header: t(tasksTableColumns.i04),
      Cell: ({ row, row: { index } }: CellProps<LegendColumn>) =>
        isInput ? (
          <>
            <ControlledNumberInput name={`legend.${index}.i04`} />
          </>
        ) : (
          <> {row.original.i04} </>
        ),
      accessor: "i04",
    },
    {
      Header: t(tasksTableColumns.i05),
      Cell: ({ row, row: { index } }: CellProps<LegendColumn>) =>
        isInput ? (
          <>
            <ControlledNumberInput name={`legend.${index}.i05`} />
          </>
        ) : (
          <> {row.original.i05} </>
        ),
      accessor: "i05",
    },
    {
      Header: t(tasksTableColumns.i06),
      Cell: ({ row, row: { index } }: CellProps<LegendColumn>) =>
        isInput ? (
          <>
            <ControlledNumberInput name={`legend.${index}.i06`} />
          </>
        ) : (
          <> {row.original.i06} </>
        ),
      accessor: "i06",
    },
    {
      Header: t(tasksTableColumns.i07),
      Cell: ({ row, row: { index } }: CellProps<LegendColumn>) =>
        isInput ? (
          <>
            <ControlledNumberInput name={`legend.${index}.i07`} />
          </>
        ) : (
          <> {row.original.i07} </>
        ),
      accessor: "i07",
    },
  ];
};

export const ResourcesListColumns = ({
  t,
  isInput,
}: ResourcesColumnsProps): ResourcesListColumnsType[] => {
  return [
    {
      Header: t(resourceListTableColumns.odc),
      accessor: "odc",
    },
    {
      Header: t(resourceListTableColumns.resourceCount),
      width: 250,
      accessor: "resourceCount",
      Cell: ({ row, row: { index } }: CellProps<ResourcesListDataType>) => (
        <div style={{ maxWidth: "200px", textAlign: "center" }}>
          {isInput ? (
            <>
              <ControlledNumberInput name={`resource.${index}.resourceCount`} />
            </>
          ) : (
            <> {row.original.resourceCount} </>
          )}
        </div>
      ),
    },
    {
      Header: t(resourceListTableColumns.annualLeaves),
      accessor: "annualLeaves",
      width: 250,
      Cell: ({ row, row: { index } }: CellProps<ResourcesListDataType>) => (
        <div style={{ maxWidth: "200px", textAlign: "center" }}>
          {isInput ? (
            <>
              <ControlledNumberInput name={`resource.${index}.annualLeaves`} />
            </>
          ) : (
            <> {row.original.annualLeaves} </>
          )}
        </div>
      ),
    },
    {
      Header: "",
      accessor: "actions",
      width: 400,
      Cell: ({ row, row: { id } }: CellProps<ResourcesListDataType>) => (
        <div style={{ textAlign: "right" }}>
          <IconButton
            onClick={() => console.log("delete", id)}
            aria-label={`delete-${row.index}`}
          >
            <SvgIcon name="delete" $size={2} color="error" />
          </IconButton>
        </div>
      ),
    },
  ];
};

const EstimationListSubColum: Column<EstimationSubColumn>[] = [
  {
    Header: "IO3",
    accessor: "iO3",
    Cell: (): ReactElement => <ControlledNumberInput width={7.5} name="io3" />,
  },
  {
    Header: "IO4",
    accessor: "iO4",
    Cell: (): ReactElement => <ControlledNumberInput width={7.5} name="io4" />,
  },
  {
    Header: "IO5",
    accessor: "iO5",
    Cell: (): ReactElement => <ControlledNumberInput width={7.5} name="io5" />,
  },
  {
    Header: "IO6",
    accessor: "iO6",
    Cell: (): ReactElement => <ControlledNumberInput width={7.5} name="io6" />,
  },
  {
    Header: "IO7",
    accessor: "iO7",
    Cell: (): ReactElement => <ControlledNumberInput width={7.5} name="io7" />,
  },
];

export const EstimationListColumns = ({
  t,
}: EstimationColumnProps): Column<EstimationColumn>[] => [
  {
    Header: t(estimationColumns.taskName),
    accessor: "taskName",
  },
  {
    Header: t(estimationColumns.complexity),
    accessor: "complexity",
  },
  {
    Header: t(estimationColumns.noOfResources),
    accessor: "resourcesNo",
    Cell: (): ReactElement => {
      return (
        <Table<EstimationSubColumn>
          name="sub-table"
          noColor
          width="50px"
          data={[
            {
              iO3: 10,
              iO4: 10,
              iO5: 10,
              iO6: 10,
              iO7: 10,
            },
          ]}
          columns={EstimationListSubColum}
        />
      );
    },
  },
  {
    Header: t(estimationColumns.totalManHours),
    accessor: "totalManHours",
  },
  {
    Header: t(estimationColumns.totalManDays),
    accessor: "totalManDays",
  },
];
