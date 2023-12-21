import type { TFunction } from 'i18next';
import { Column } from 'react-table';

export type ProjectListDataType = {
  projectId: string;
  prjName: string;
  noOfTeams: number;
  noOfUsers: number;
};

export type ProjectListColumnsType = Column<ProjectListDataType> & { id?: string };

export type ProjectListColumnsProps = {
  t: TFunction<'translation', undefined>;
  onDelete: (projectId: string) => void;
};
