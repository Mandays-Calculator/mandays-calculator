import type { AddTeamForm as AddTeamFormType } from "../add-project/types";
import type { Project } from "~/api/projects";

import { ReactElement, useEffect } from "react";
import { Grid, Stack, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import { PageContainer, Form } from "~/components";
import { CustomButton } from "~/components/form/button";
import { appProjectSchema } from "../add-project/project-schema";
import { SetProjectForm, addFormInitValue } from "../add-project/utils";
import TeamList from "../add-project/team-list";

type ProjectListProps = {
  selectedProject: Project | null;
  handleBackBtn: () => void;
};

const StyledLabel = styled(Typography)(() => ({
  fontSize: "1.2rem",
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
        <StyledLabel variant="body1">
          Project Name: <strong>{selectedProject?.name}</strong>
        </StyledLabel>
        <Stack
          direction="column"
          maxHeight="350px"
          sx={{
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "0px",
              background: "transparent",
            },
          }}
        >
          <TeamList toggleEdit={() => void 0} readonly={true} />
        </Stack>

        <Grid paddingY={2}></Grid>

        <Stack
          direction="row"
          display="flex"
          justifyContent="flex-end"
          padding={2}
          spacing={2}
        >
          <CustomButton type="submit" onClick={handleBackBtn}>
            Back
          </CustomButton>
        </Stack>
      </Form>
    </PageContainer>
  );
};

export default ViewProject;
