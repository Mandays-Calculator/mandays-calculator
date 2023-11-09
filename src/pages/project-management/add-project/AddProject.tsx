import { useState, type ReactElement } from "react";
import type { AddTeamForm as AddTeamFormType } from "./types";

import { useFormik } from "formik";

import { PageContainer } from "~/components/page-container";
import { ControlledTextField } from "~/components/form/controlled";
import { Form, SvgIcon } from "~/components";
import { StyledContainer } from "./components/TeamListCard/TeamListCard";
import { CustomButton } from "~/components/form/button";

import { styled, Grid, Typography, IconButton, Stack } from "@mui/material";

import { addFormInitValue } from "./utils";

import AddTeamForm from "./add-team-form";
import TeamList from "./team-list";
import EditTeamForm from "./edit-team-form";

const StyledTextField = styled(ControlledTextField)(() => ({
  width: "50%",
}));

interface ProjectListProps {
  handleAddProject: () => void;
  // Other props
}

const AddProject = (props: ProjectListProps): ReactElement => {
  const { handleAddProject } = props;
  const projectForm = useFormik<AddTeamFormType>({
    initialValues: addFormInitValue,
    onSubmit: (val) => console.log(val),
  });
  const [showTeamForm, setShowTeamForm] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [teamIndex, setTeamIndex] = useState<number>(0);

  const handleToggleEdit = (teamId: number): void => {
    setTeamIndex(teamId);
    setIsEditMode(!isEditMode);
  };

  return (
    <PageContainer>
      {!isEditMode ? (
        <Form instance={projectForm}>
          <StyledTextField
            name="projectName"
            placeholder="Enter keyword here..."
            label="Project Name"
          />
          <TeamList toggleEdit={(teamIndex) => handleToggleEdit(teamIndex)} />
          <Grid paddingY={2}></Grid>

          {showTeamForm ? (
            <AddTeamForm onCancel={() => setShowTeamForm(false)} />
          ) : (
            <StyledContainer $isDefault $isAdd>
              <IconButton onClick={() => setShowTeamForm(true)}>
                <SvgIcon name="add" color="primary" />

                <Typography>Add Team</Typography>
              </IconButton>
            </StyledContainer>
          )}
          <Stack
            direction="row"
            display="flex"
            justifyContent="flex-end"
            padding={2}
            spacing={2}
          >
            <CustomButton
              colorVariant="secondary"
              type="button"
              onClick={handleAddProject}
            >
              Cancel
            </CustomButton>
            <CustomButton type="submit" onClick={handleAddProject}>
              Add Project
            </CustomButton>
          </Stack>
        </Form>
      ) : (
        <Form instance={projectForm}>
          <EditTeamForm
            teamIndex={teamIndex}
            onCancel={(teamIndex) => handleToggleEdit(teamIndex)}
          />
        </Form>
      )}
    </PageContainer>
  );
};

export default AddProject;
