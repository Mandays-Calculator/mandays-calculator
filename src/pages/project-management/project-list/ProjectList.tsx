import { ChangeEvent, ReactElement, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, styled, Box } from '@mui/material';

import { ProjectListColumns } from '../utils/columns';
import { ProjectListConfirmDialogType, ProjectListDataType } from '../utils/types';
import { PageContainer } from '~/components/page-container';
import { CustomButton } from '~/components/form/button';
import { ConfirmModal, ErrorMessage, Table } from '~/components';
import { Project } from '~/api/projects';
import { useRequestHandler } from '~/hooks/request-handler';
import { useErrorHandler } from '~/hooks/error-handler';
import { useDeleteProjectMutation } from '~/mutations/projects';
import { useProjectList } from '~/queries/project-management/ProjectManagement';

interface ProjectListProps {
  handleAddProject: () => void;
}

type ActionType = {
  type: 'SET_VALUE' | 'SEARCH';
  payload: Project[] | string;
};

const StyledTextField = styled(TextField)(() => ({
  width: '100%',
}));

const initialProjectListState = {
  results: [] as ProjectListDataType[],
  filteredText: '',
  filteredResult: [] as ProjectListDataType[],
};

const projectListReducer = (state: typeof initialProjectListState, action: ActionType) => {
  if (action.type === 'SET_VALUE') {
    const mapProjectResult = (data: Project[]): ProjectListDataType[] => {
      return data.map((response) => {
        let userCount = 0;

        response.teams.forEach((team) => {
          userCount += team.teamMembers.length;
        });

        return {
          projectId: response.projectId,
          prjName: response.name,
          noOfTeams: response.teams.length,
          noOfUsers: userCount,
        };
      });
    };

    const newResult = mapProjectResult(action.payload as Project[]);

    return { ...state, results: newResult, filteredResult: newResult };
  } else if (action.type === 'SEARCH') {
    const filteredData = state.results.filter((row) => row.prjName.toLowerCase().includes(action.payload as string));

    return { ...state, filteredResult: filteredData, filteredText: action.payload as string };
  } else {
    return state;
  }
};

const ProjectList = (props: ProjectListProps): ReactElement => {
  const { t } = useTranslation();
  const { handleAddProject } = props;
  const { data, refetch } = useProjectList();
  const [projectListState, dispatchProjectList] = useReducer(projectListReducer, initialProjectListState);
  const [confirmDialog, setConfirmDialog] = useState<ProjectListConfirmDialogType>({ open: false, id: '' });

  const onChangeFilterText = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatchProjectList({ type: 'SEARCH', payload: e.target.value as string });
  };
  const onDelete = (projectId: string): void => {
    setConfirmDialog({ open: !confirmDialog.open, id: projectId });
  };
  const [status, callApi] = useRequestHandler(useDeleteProjectMutation().mutate, () => refetch());

  const deleteProject = (): void => {
    callApi(confirmDialog.id);
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  useEffect(() => {
    if (!data) return;
    const fetchData = async () => {
      try {
        const result = (Array.isArray(data) ? data : []) as Project[];

        dispatchProjectList({ type: 'SET_VALUE', payload: result });
      } catch (error) {
        dispatchProjectList({ type: 'SET_VALUE', payload: [] });
      }
    };

    fetchData();
  }, [data]);

  return (
    <PageContainer>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={5}>
          <StyledTextField
            size='small'
            placeholder='Enter keyword here...'
            value={projectListState.filteredText}
            onChange={onChangeFilterText}
          />
        </Grid>
        <Grid item xs={7} container justifyContent='flex-end'>
          <CustomButton type='button' onClick={handleAddProject}>
            Add Project
          </CustomButton>
        </Grid>
      </Grid>
      <Box marginTop='14px'>
        <Table name='ODCTable' columns={ProjectListColumns({ t, onDelete })} data={projectListState.filteredResult} />
      </Box>

      <ConfirmModal
        onConfirm={deleteProject}
        open={confirmDialog.open}
        message={t('Are you sure you want to delete?')}
        onClose={() =>
          setConfirmDialog({
            open: false,
            id: '',
          })
        }
        selectedRow={null}
      />
      {!status.loading && <ErrorMessage error={useErrorHandler(status.error, t)} type='alert' />}
    </PageContainer>
  );
};

export default ProjectList;
