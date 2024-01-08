import { useState, type ReactElement } from "react";
import type { AddTeamForm as AddTeamFormType } from "./types";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { styled, Grid, Typography, IconButton, Stack } from "@mui/material";
import { useCreateProjectMutation } from "~/mutations/projects";
import { useRequestHandler } from "~/hooks/request-handler";
import { useErrorHandler } from "~/hooks/error-handler";
import { PageContainer } from "~/components/page-container";
import { ControlledTextField } from "~/components/form/controlled";
import { ErrorMessage, Form, SvgIcon } from "~/components";
import { useTimeout } from "../utils/functions";
import { StyledContainer } from "./components/TeamListCard/TeamListCard";
import { CustomButton } from "~/components/form/button";
import { addFormInitValue } from "./utils";
import { appProjectSchema } from "./project-schema";
import AddTeamForm from "./add-team-form";
import EditTeamForm from "./edit-team-form/EditTeamForm";
import TeamList from "./team-list";


const StyledTextField = styled(ControlledTextField)(() => ({
  width: "50%",
}));

interface ProjectListProps {
  handleAddProject: () => void;
}

const AddProject = (props: ProjectListProps): ReactElement => {
  const { t } = useTranslation();
  const { handleAddProject } = props;
  const projectForm = useFormik<AddTeamFormType>({
    initialValues: addFormInitValue,
    validationSchema: appProjectSchema,
    onSubmit: () => onSubmit(),
  });
  const [showTeamForm, setShowTeamForm] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [teamIndex, setTeamIndex] = useState<number>(0);
  const [addProjectErrorMsg, setAddProjectErrorMsg] = useState<string>("");
  const [triggerTimeout] = useTimeout();

  const handleToggleEdit = (teamId: number): void => {
    setTeamIndex(teamId);
    setIsEditMode(!isEditMode);
  };

  const [status, callApi] = useRequestHandler(useCreateProjectMutation().mutate, handleAddProject);

  const onSubmit = async (): Promise<void> => {
    if (status.loading) return;

    const { projectName, teams } = projectForm.values;

    const createProjectParams = {
      name: projectName,
      isActive: 1,
      dateCreated: Date.now(),
      lastUpdatedDate: Date.now(),
      projectTeam: teams.map((team) => ({
        teamName: team.teamName,
        leadName: team.teamLead,
        isActive: 0,
        teamMembers: team.teamMembers.map(({ name }) => ({
          name,
          isActive: 0,
        })),
      })),
    };

    callApi(createProjectParams);
  };

  const onValidateForm = async (): Promise<void> => {
    const errors = await projectForm.validateForm();
    if (Object.entries(errors).length) {
      let errorMessage =
        typeof errors.teams === "string"
          ? "Must have at least 1 team in the project"
          : "";

      if (typeof errors.teams === "object") {
        errorMessage = "Edit team to add members";
      }

      showError(errorMessage);
    }
  };

  const showError = (error: string): void => {
    setAddProjectErrorMsg(error);

    triggerTimeout(() => {
      setAddProjectErrorMsg("");
    });
  };

  const isErrorField = (field: string): boolean => {
    return projectForm.errors[field as keyof {}] ? true : false;
  };

  return (
    <PageContainer>
      {!isEditMode ? (
        <Form instance={projectForm}>
          <StyledTextField
            name="projectName"
            placeholder="Enter keyword here..."
            label="Project Name"
            error={isErrorField("projectName")}
            helperText={
              isErrorField("projectName") ? "Please Input Project Name" : ""
            }
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
            <CustomButton
              type="submit"
              onClick={onValidateForm}
              disabled={status.loading}
            >
              {status.loading ? "Loading..." : "Add Project"}
            </CustomButton>
            
          </Stack>
          {!status.loading && (
              <ErrorMessage error={useErrorHandler(status.error, t) || t(addProjectErrorMsg)} type="alert" />
            )}
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
