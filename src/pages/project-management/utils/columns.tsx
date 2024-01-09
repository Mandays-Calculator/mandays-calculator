import type { ProjectListColumnsProps, ProjectListColumnsType, ProjectListDataType } from './types';
import { CellProps } from 'react-table';
import { IconButton } from '@mui/material';
import { SvgIcon } from '~/components';

export const ProjectListColumns = ({ t, onDelete }: ProjectListColumnsProps): ProjectListColumnsType[] => {
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
          <IconButton color='primary'>
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
