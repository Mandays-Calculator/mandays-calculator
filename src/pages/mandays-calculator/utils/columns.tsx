import type { ReactElement } from "react";
import type { Column } from "react-table";
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
  TasksListDataType,
} from "./types";
import { CellProps } from "react-table";
import { IconButton, Grid, Typography, Stack } from "@mui/material";
import { SvgIcon, Table, ErrorMessage } from "~/components";
import {
  ControlledNumberInput,
  ControlledSelect,
} from "~/components/form/controlled";
import { FormErrors } from "~/components/form/types";
import { getFieldError } from "~/components/form/utils";
import LocalizationKey from "~/i18n/key";
import renderStatus from "~/utils/helpers/renderStatusHelper";
import {
  StyledResourceCellContainer,
  StyledEstimationResourceTableContainer,
  SubColumnNumInputContainer,
} from "../styles";
import {
  calculateTotalManHoursPerTask,
  roundOffValue,
} from "../estimation-details/utils/calculate";
import { MandaysForm } from "../estimation-details";
import { FormikErrors } from "formik";
import { getMultipliedEstimations } from "../estimation-details/summary/utils/mapper";

const {
  mandaysCalculator: {
    sprintListTableColumns,
    summaryTableColumns,
    tasksTableColumns,
    resourceListTableColumns,
    estimation: { estimationColumns },
  },
} = LocalizationKey;

/**
 * Module providing column configurations for tables in the Mandays Estimation Tool.
 * Defines columns for Sprint List, Summary, Tasks, Legend, Resources, and Estimation tables.
 * Configurations are modular and cover actions, input handling, and sub-tables.
 */
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
  formValues,
}: TasksColumnsProps): SummaryListColumnsType[] => {
  return [
    {
      Header: t(summaryTableColumns.functionality),
      accessor: "name",
    },
    {
      Header: t(summaryTableColumns.totalManHours),
      accessor: "totalManHours",
      Cell: () => {
        const multipliedEstimations = getMultipliedEstimations(
          formValues as MandaysForm,
        );

        const taskListHours = Object.values(multipliedEstimations).map(
          (item) => item.manHours,
        );
        return roundOffValue(
          taskListHours.reduce((sum: number, num: number) => sum + num, 0),
          "hours",
        );
      },
    },
    {
      Header: t(summaryTableColumns.totalManDays),
      accessor: "totalManDays",
      Cell: () => {
        const multipliedEstimations = getMultipliedEstimations(
          formValues as MandaysForm,
        );

        const taskListHours = Object.values(multipliedEstimations).map(
          (item) => item.manHours,
        );
        return roundOffValue(
          taskListHours.reduce((sum: number, num: number) => sum + num, 0) / 8,
          "days",
        );
      },
    },
  ];
};

export const TasksListColumns = ({
  t,
  formValues,
}: TasksColumnsProps): TasksListColumnsType[] => {
  return [
    {
      Header: t(tasksTableColumns.tasks),
      accessor: "task",
    },
    {
      Header: t(tasksTableColumns.complexity),
      accessor: "complexity",
    },
    {
      Header: () => (
        <Stack width="315px">
          <Typography variant="body1" color="initial" textAlign="center">
            {t(estimationColumns.noOfResources)}
          </Typography>
        </Stack>
      ),

      Cell: ({ row }: CellProps<TasksListDataType>) => {
        const carrerLvlData = {
          data: [
            { carrerLvl: "IO3", value: row.original.resourceCountByTasks?.I03 },
            { carrerLvl: "IO4", value: row.original.resourceCountByTasks?.I04 },
            { carrerLvl: "IO5", value: row.original.resourceCountByTasks?.I05 },
            { carrerLvl: "IO6", value: row.original.resourceCountByTasks?.I06 },
            { carrerLvl: "IO7", value: row.original.resourceCountByTasks?.I07 },
          ],
        };
        return (
          <Grid container key={row.index}>
            {carrerLvlData.data.map((data) => {
              return (
                <Grid item xs={2.4}>
                  {data.carrerLvl}
                  <Typography mt={3}>{data.value}</Typography>
                </Grid>
              );
            })}
          </Grid>
        );
      },
      accessor: "resourceCountByTasks",
    },

    {
      Header: t(summaryTableColumns.totalManHours),
      Cell: ({ row }: CellProps<TasksListDataType>) => {
        const resources = Object.entries(
          row.original.resourceCountByTasks || {},
        );

        return (
          <>
            <Typography mt={3}>
              {roundOffValue(
                calculateTotalManHoursPerTask({
                  resources,
                  complexityIdParam: row.original.complexityId,
                  formValues: formValues as MandaysForm,
                }),
                "hours",
              )}
            </Typography>
          </>
        );
      },
      accessor: "totalManHours",
    },
    {
      Header: t(summaryTableColumns.totalManDays),
      Cell: ({ row }: CellProps<TasksListDataType>) => {
        const resources = Object.entries(
          row.original.resourceCountByTasks || {},
        );

        return (
          <>
            <Typography mt={3}>
              {roundOffValue(
                calculateTotalManHoursPerTask({
                  resources,
                  complexityIdParam: row.original.complexityId,
                  formValues: formValues as MandaysForm,
                }) / 8,
                "days",
              )}
            </Typography>
          </>
        );
      },
      accessor: "totalManDays",
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
  mode,
}: ResourcesColumnsProps): ResourcesListColumnsType[] => {
  const columns = [
    {
      Header: t(resourceListTableColumns.odc),
      accessor: "odcId",
      Cell: ({ row }: CellProps<ResourcesListDataType>) => {
        const fieldName = `resources.${title}.${row.index}.odcId`;
        const fieldError = getFieldError(form.errors as FormErrors, fieldName);

        return (
          <StyledResourceCellContainer isInput={isInput}>
            <ControlledSelect
              name={fieldName}
              options={odc}
              error={!!fieldError}
              labelOnly={!isInput}
            />
            <ErrorMessage type="field" error={fieldError} />
          </StyledResourceCellContainer>
        );
      },
    },
    {
      Header: t(resourceListTableColumns.resourceCount),
      width: 250,
      accessor: "numberOfResources",
      Cell: ({ row }: CellProps<ResourcesListDataType>) => {
        const fieldName = `resources.${title}.${row.index}.numberOfResources`;
        const fieldError = getFieldError(form.errors as FormErrors, fieldName);

        return (
          <StyledResourceCellContainer isInput={isInput}>
            {isInput ? (
              <>
                <ControlledNumberInput name={fieldName} error={!!fieldError} />
                <ErrorMessage type="field" error={fieldError} />
              </>
            ) : (
              <> {row.original.numberOfResources} </>
            )}
          </StyledResourceCellContainer>
        );
      },
    },
    {
      Header: t(resourceListTableColumns.annualLeaves),
      accessor: "annualLeaves",
      width: 250,
      Cell: ({ row }: CellProps<ResourcesListDataType>) => {
        const fieldName = `resources.${title}.${row.index}.annualLeaves`;
        const fieldError = getFieldError(form.errors as FormErrors, fieldName);
        return (
          <StyledResourceCellContainer isInput={isInput}>
            {isInput ? (
              <>
                <ControlledNumberInput name={fieldName} />
                <ErrorMessage type="field" error={fieldError} />
              </>
            ) : (
              <> {row.original.annualLeaves} </>
            )}
          </StyledResourceCellContainer>
        );
      },
    },
  ];

  if (mode !== "view") {
    columns.push({
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
    });
  }
  return columns as ResourcesListColumnsType[];
};

const EstimationListSubColumn = (
  careerSteps: CommonOption,
  phaseIndex: number,
  funcIndex: number,
  estimationIndex: number,
  errors: FormikErrors<MandaysForm>,
): Column<any>[] => {
  return careerSteps.map((item) => ({
    Header: `${item.label}`,
    Cell: (): ReactElement => {
      const fieldName = `phases[${phaseIndex}].functionalities[${funcIndex}].estimations[${estimationIndex}].resourceCountByTasks.${item.label}`;
      const fieldError = getFieldError(errors as FormErrors, fieldName);
      return (
        <SubColumnNumInputContainer>
          <ControlledNumberInput
            width={7}
            name={fieldName}
            error={!!fieldError}
          />
          <ErrorMessage type="field" error={fieldError} />
        </SubColumnNumInputContainer>
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
  form,
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

        const fieldName = `phases[${phaseIndex}].functionalities[${funcIndex}].estimations[${row.index}]`;
        const fieldError = getFieldError(form.errors as FormErrors, fieldName);
        return (
          <>
            <StyledEstimationResourceTableContainer>
              <Table<EstimationSubColumn>
                name="sub-table"
                noColor
                data={estimationResource}
                columns={EstimationListSubColumn(
                  careerSteps as SelectObject[],
                  phaseIndex,
                  funcIndex,
                  row.index,
                  form.errors,
                )}
              />
            </StyledEstimationResourceTableContainer>
            <div style={{ textAlign: "center", marginTop: 15 }}>
              <ErrorMessage type="field" error={fieldError} />
            </div>
          </>
        );
      },
    },
    {
      Header: t(estimationColumns.totalManHours),
      accessor: "totalManHours",
      Cell: (cell: CellProps<EstimationColumn>): ReactElement => {
        const resources = Object.entries(
          cell.row.original.resourceCountByTasks,
        );
        return (
          <>
            {calculateTotalManHoursPerTask({
              resources,
              complexityIdParam: cell.row.original.complexityId,
              formValues: form.values,
            })}
          </>
        );
      },
    },
    {
      Header: t(estimationColumns.totalManDays),
      accessor: "totalManDays",
      Cell: (cell: CellProps<EstimationColumn>): ReactElement => {
        const resources = Object.entries(
          cell.row.original.resourceCountByTasks,
        );
        return (
          <>
            {roundOffValue(
              calculateTotalManHoursPerTask({
                resources,
                complexityIdParam: cell.row.original.complexityId,
                formValues: form.values,
              }) / 8,
              "days",
            )}
          </>
        );
      },
    },
  ];
};
