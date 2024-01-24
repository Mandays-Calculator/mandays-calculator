import type { AddTeamForm as AddTeamFormType } from '../add-project/types';
import type { Project } from '~/api/projects';

import { ReactElement, useEffect } from 'react';
import { Grid, Stack, styled } from '@mui/material';
import { useFormik } from 'formik';
import { PageContainer, Form } from '~/components';
import { ControlledTextField } from '~/components/form/controlled';
import { CustomButton } from '~/components/form/button';
import { appProjectSchema } from '../add-project/project-schema';
import { SetProjectForm, addFormInitValue } from '../add-project/utils';
import TeamList from '../add-project/team-list';

type ProjectListProps = {
  selectedProject: Project | null;
  handleBackBtn: () => void;
};

const StyledTextField = styled(ControlledTextField)(() => ({
  width: '50%',
}));

const ViewProject = (props: ProjectListProps): ReactElement => {
  const { handleBackBtn, selectedProject } = props;
  const projectForm = useFormik<AddTeamFormType>({
    initialValues: addFormInitValue,
    validationSchema: appProjectSchema,
    onSubmit: () => void 0,
  });

  useEffect(() => {
    if (selectedProject) {
      projectForm.setValues(SetProjectForm(selectedProject));
    }
  }, [selectedProject]);

  return (
    <PageContainer>
      <Form instance={projectForm}>
        <StyledTextField name='projectName' label='Project Name' value={selectedProject?.name} readOnly />

        <Stack
          direction='column'
          maxHeight='350px'
          sx={{
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: '0px',
              background: 'transparent',
            },
          }}
        >
          <TeamList toggleEdit={() => void 0} readonly={true} />
        </Stack>

        <Grid paddingY={2}></Grid>

        <Stack direction='row' display='flex' justifyContent='flex-end' padding={2} spacing={2}>
          <CustomButton type='submit' onClick={handleBackBtn}>
            Back
          </CustomButton>
        </Stack>
      </Form>
    </PageContainer>
  );
};

export default ViewProject;
