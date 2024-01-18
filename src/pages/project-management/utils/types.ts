import type { TFunction } from 'i18next';
import type { User } from '~/api/user';
import { Project } from '~/api/projects';
import { Column } from 'react-table';

export type ProjectListDataType = Project & {
  projectId: string;
  prjName: string;
  noOfTeams: number;
  noOfUsers: number;
};

export type ProjectListColumnsType = Column<ProjectListDataType> & { id?: string };

export type TeamMembersColumnType = Column<TeamMembers> & { id?: string };

export type TeamMembers = User & { name: string; accessor: string; abbreviation: string };

export type ProjectListColumnsProps = {
  t: TFunction<'translation', undefined>;
  onDelete: (projectId: string) => void;
  onEdit: (project: Project) => void;
};

export type TeamListColumnsProps = {
  t: TFunction<'translation', undefined>;
  onDelete: (userId: string) => void;
};

export type ProjectListConfirmDialogType = {
  open: boolean;
  id: string;
};
