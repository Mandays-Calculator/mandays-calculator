import { FormikContextType } from "formik";
import type { TFunction } from "i18next";
import type { Column } from "react-table";
import { CareerSteps, Status } from "~/api/common";
import { CommonOption } from "~/queries/common/options";
import { MandaysForm } from "../estimation-details";

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
  tasks: string;
  complexity: string;
  i03: string;
  i04: string;
  i05: string;
  i06: string;
  i07: string;
  totalManHours: string;
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
  taskName: string;
  complexity: string;
  resourcesNo: string;
  totalManHours: number;
  totalManDays: number;
}

export interface EstimationSubColumn {
  iO3: number;
  iO4: number;
  iO5: number;
  iO6: number;
  iO7: number;
}

export type EstimationColumnProps = {
  t: TFunction<"translation", undefined>;
  isInput?: boolean;
};
