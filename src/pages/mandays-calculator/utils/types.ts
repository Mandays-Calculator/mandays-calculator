import type { FormikContextType } from "formik";
import type { Column } from "react-table";
import type { TFunction } from "i18next";
import type { CommonOption } from "~/queries/common/options";
import type { CareerSteps, Status } from "~/api/common";
import type { Estimations, MandaysForm } from "../estimation-details";

interface TeamLead {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  employeeId: string;
  active: boolean;
  fullName: string;
}

interface Team {
  projectId: string;
  name: string;
  id: string;
  teamLead: TeamLead;
  active: boolean;
  lastUpdatedDate: string;
}

export interface SprintListDataType {
  id: string;
  name: string;
  team: Team;
  startDate: string;
  status: Status;
}

export interface SummaryListDataType {
  functionality: string;
  totalManHours: string;
  totalManDays: string;
}

export interface TasksListDataType {
  task: string;
  complexity: string;
  resourceCountByTasks?: {
    I03?: number;
    I04?: number;
    I05?: number;
    I06?: number;
    I07?: number;
  };
  totalManHours?: string;
  totalManDays?: string;
}

export interface ResourcesListDataType {
  odcId: string;
  numberOfResources: number;
  annualLeaves: number;
  actions?: any;
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
  complexities: CommonOption;
  careerSteps: CommonOption;
  form: FormikContextType<MandaysForm>;
};

export type LegendColumn = {
  [key: string]: {
    careerStep: CareerSteps | string;
    manHours: number;
  }[];
};

export type ResourcesColumnsProps = {
  t: TFunction<"translation", undefined>;
  isInput?: boolean;
  title: string;
  handleDeleteResources: (index: number) => void;
  odc: CommonOption | undefined;
  selectedODC: string[];
  form: FormikContextType<MandaysForm>;
};

export interface EstimationColumn {
  task: string;
  complexity: string;
  resourcesNo: string;
  totalManHours: number;
  totalManDays: number;
  taskId: string;
  complexityId: string;
  resourceCountByTasks: {
    I03: number;
    I04: number;
    I05: number;
    I06: number;
    I07: number;
  };
}

export interface EstimationSubColumn {
  I03: number;
  I04: number;
  I05: number;
  I06: number;
  I07: number;
}

export type EstimationColumnProps = {
  t: TFunction<"translation", undefined>;
  isInput?: boolean;
  careerSteps: CommonOption;
  estimations: Estimations[];
  funcIndex: number;
  phaseIndex: number;
};
