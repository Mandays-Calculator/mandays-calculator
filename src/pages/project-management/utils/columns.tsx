import type {
  ProjectListColumnsProps,
  ProjectListColumnsType,
  ProjectListDataType,
  TeamListColumnsProps,
  TeamMembers,
  TeamMembersColumnType,
} from './types';
import { CellProps } from 'react-table';
import { IconButton } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { SvgIcon } from '~/components';

export const ProjectListColumns = ({ t, onDelete, onEdit, onView }: ProjectListColumnsProps): ProjectListColumnsType[] => {
  return [
    {
      Header: t('Project'),
      accessor: 'prjName',
    },
    {
      Header: t('No. of Teams'),
      accessor: 'noOfTeams',
    },
    {
      Header: t('No. of Users'),
      accessor: 'noOfUsers',
    },
    {
      Header: '',
      id: 'actions',
      Cell: ({ row }: CellProps<ProjectListDataType>) => (
        <>
          <IconButton onClick={() => onView(row.original)} color='primary'>
            <InfoOutlined color='primary' sx={{ fontSize: "1.4rem" }}/>
          </IconButton>
          <IconButton onClick={() => onEdit(row.original)} color='primary'>
            <SvgIcon name='edit' color='primary' $size={2} />
          </IconButton>
          <IconButton onClick={() => onDelete(row.original.projectId)}>
            <SvgIcon name='delete' color='error' $size={2} />
          </IconButton>
        </>
      ),
    },
  ];
};

export const TeamListColumns = ({ t, onDelete }: TeamListColumnsProps): TeamMembersColumnType[] => {
  return [
    {
      Header: t('Name'),
      accessor: 'name',
    },
    {
      Header: t('ODC'),
      accessor: 'abbreviation',
    },
    {
      Header: t('Career Step'),
      accessor: 'careerStep',
    },
    {
      Header: '',
      id: 'actions',
      Cell: ({ row }: CellProps<TeamMembers>) => (
        <>
          <IconButton onClick={() => onDelete(row.original.id)}>
            <SvgIcon name='delete' color='error' $size={2} />
          </IconButton>
        </>
      ),
    },
  ];
};
