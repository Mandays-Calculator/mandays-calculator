import type { Column } from "react-table";
import type { ReactElement } from "react";
import type { CommonOption } from "~/queries/common/options";
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
import {
  ControlledNumberInput,
  ControlledSelect,
} from "~/components/form/controlled";
import { SvgIcon, Table } from "~/components";

import renderStatus from "~/utils/helpers/renderStatusHelper";
import LocalizationKey from "~/i18n/key";
import { getFieldError } from "~/components/form/utils";
import { FormErrors } from "~/components/form/types";
import { ErrorMessage } from "~/components";

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
  careerSteps,
  form,
  complexities,
}: LegendColumnProps): Column<LegendColumn>[] => {
  return [
    {
      Header: t(tasksTableColumns.complexity),
      accessor: "complexity",
      Cell: ({ cell }: CellProps<LegendColumn>) => {
        const findComplexity = complexities.find(
          (cl) => cl.value === cell.value,
        );
        return <>{findComplexity?.label}</>;
      },
    },
    ...careerSteps.map((item, careerIndex) => ({
      Header: item.label,
      Cell: ({ row }: CellProps<LegendColumn>) => {
        const complexityId = row.original.complexity;
        const legendData: {
          careerStep: string;
          manHours: number;
        }[] = form.values.legends[complexityId.toString()] || [];
        const careerStepData = legendData.find(
          (data) => data.careerStep === item.label,
        );
        const fieldValue = `legends.${complexityId}.[${careerIndex}].manHours`;
        return isInput ? (
          <>
            <ControlledNumberInput name={fieldValue} />
          </>
        ) : (
          <> {careerStepData ? careerStepData.manHours : 0} </>
        );
      },
      accessor: item.label,
    })),
  ];
};

export const ResourcesListColumns = ({
  t,
  isInput = false,
  title,
  handleDeleteResources,
  odc,
  form,
}: ResourcesColumnsProps): ResourcesListColumnsType[] => {
  return [
    {
      Header: t(resourceListTableColumns.odc),
      accessor: "odcId",
      Cell: ({ row }: CellProps<ResourcesListDataType>) => {
        const fieldName = `resource.${title}.${row.index}.odcId`;
        const fieldError = getFieldError(form.errors as FormErrors, fieldName);

        return (
          <div style={{ maxWidth: "200px", textAlign: "center" }}>
            <ControlledSelect
              name={fieldName}
              options={odc}
              error={!!fieldError}
            />
            <ErrorMessage type="field" error={fieldError} />
          </div>
        );
      },
    },
    {
      Header: t(resourceListTableColumns.resourceCount),
      width: 250,
      accessor: "numberOfResources",
      Cell: ({ row }: CellProps<ResourcesListDataType>) => {
        const fieldName = `resource.${title}.${row.index}.numberOfResources`;
        const fieldError = getFieldError(form.errors as FormErrors, fieldName);
        return (
          <div style={{ maxWidth: "200px", textAlign: "center" }}>
            {isInput ? (
              <>
                <ControlledNumberInput name={fieldName} />
                <ErrorMessage type="field" error={fieldError} />
              </>
            ) : (
              <> {row.original.numberOfResources} </>
            )}
          </div>
        );
      },
    },
    {
      Header: t(resourceListTableColumns.annualLeaves),
      accessor: "annualLeaves",
      width: 250,
      Cell: ({ row }: CellProps<ResourcesListDataType>) => {
        const fieldName = `resource.${title}.${row.index}.annualLeaves`;
        const fieldError = getFieldError(form.errors as FormErrors, fieldName);
        return (
          <div style={{ maxWidth: "200px", textAlign: "center" }}>
            {isInput ? (
              <>
                <ControlledNumberInput name={fieldName} />
                <ErrorMessage type="field" error={fieldError} />
              </>
            ) : (
              <> {row.original.annualLeaves} </>
            )}
          </div>
        );
      },
    },
    {
      Header: "",
      accessor: "actions",
      width: 400,
      Cell: ({ row, row: { index } }: CellProps<ResourcesListDataType>) => (
        <div style={{ textAlign: "right" }}>
          <IconButton
            onClick={() => handleDeleteResources(index)}
            aria-label={`delete-${row.index}`}
          >
            <SvgIcon name="delete" $size={2} color="error" />
          </IconButton>
        </div>
      ),
    },
  ];
};

const EstimationListSubColumn = (
  careerSteps: CommonOption,
  phaseIndex: number,
  funcIndex: number,
  estimationIndex: number,
): Column<any>[] => {
  return careerSteps.map((item) => ({
    Header: `${item.label}`,
    Cell: (): ReactElement => {
      const fieldName = `phases[${phaseIndex}].functionalities[${funcIndex}].estimations[${estimationIndex}].resourceCountByTasks.${item.label}`;
      return (
        <>
          <ControlledNumberInput width={7.5} name={fieldName} />
        </>
      );
    },
    accessor: `${item.label}`,
  }));
};

export const EstimationListColumns = ({
  t,
  careerSteps,
  estimations,
  phaseIndex,
  funcIndex,
}: EstimationColumnProps): Column<EstimationColumn>[] => {
  return [
    {
      Header: t(estimationColumns.taskName),
      accessor: "task",
    },
    {
      Header: t(estimationColumns.complexity),
      accessor: "complexity",
    },
    {
      Header: t(estimationColumns.noOfResources),
      accessor: "resourcesNo",
      Cell: ({ row }): ReactElement => {
        const resource = Object.keys(
          estimations[row.index].resourceCountByTasks,
        );

        const estimationResource =
          resource.length > 0
            ? [estimations[row.index].resourceCountByTasks]
            : ([
                {
                  I03: 0,
                  IO4: 0,
                  IO5: 0,
                  IO6: 0,
                  IO7: 0,
                },
              ] as any);
        return (
          <Table<EstimationSubColumn>
            name="sub-table"
            noColor
            width="50px"
            data={estimationResource}
            columns={EstimationListSubColumn(
              careerSteps,
              phaseIndex,
              funcIndex,
              row.index,
            )}
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
};
