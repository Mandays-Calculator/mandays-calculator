import { useState, type ReactElement, useEffect } from "react";
import type { AddProjectType, Project } from "~/api/projects/types";
import type {
  AddTeamForm as AddTeamFormType,
  TeamObject,
} from "./types";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { styled, Grid, Typography, IconButton, Stack } from "@mui/material";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "~/mutations/projects";
import {
  APIError,
  APIStatus,
  useRequestHandler,
} from "~/hooks/request-handler";
import { useErrorHandler } from "~/hooks/error-handler";
import { PageContainer } from "~/components/page-container";
import { ControlledTextField } from "~/components/form/controlled";
import { ErrorMessage, Form, SvgIcon } from "~/components";
import { useTimeout } from "../utils/functions";
import { StyledContainer } from "./components/TeamListCard/TeamListCard";
import { CustomButton } from "~/components/form/button";
import { SetProjectForm, addFormInitValue } from "./utils";
import { appProjectSchema } from "./project-schema";
import AddTeamForm from "./add-team-form";
import EditTeamForm from "./edit-team-form/EditTeamForm";
import TeamList from "./team-list";

const StyledTextField = styled(ControlledTextField)(() => ({
  width: "50%",
}));

interface ProjectListProps {
  selectedProject: Project | null;
  handleAddEditProject: () => void;
}

const AddProject = (props: ProjectListProps): ReactElement => {
  const { t } = useTranslation();
  const { handleAddEditProject, selectedProject } = props;
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
  const onErrorAddProject = () => {
    setAddProjectErrorMsg("An error has occured!");
    triggerTimeout(() => setAddProjectErrorMsg(""));
  };
  const [createProjectStatus, callCreateProject] = useRequestHandler(
    useCreateProjectMutation().mutate,
    handleAddEditProject,
    onErrorAddProject
  );
  const [updateProjectStatus, callUpdateProject] = useRequestHandler(
    useUpdateProjectMutation().mutate,
    handleAddEditProject,
    onErrorAddProject
  );

  const onSubmit = async (): Promise<void> => {
    if (createProjectStatus.loading) return;

    const { projectName, teams: teamForm } = projectForm.values;

    if (selectedProject) {
      updateProject(projectName, teamForm);
    } else {
      createProject(projectName, teamForm);
    }
  };

  const createProject = (projectName: string, teamForm: TeamObject[]) => {
    const createProjectParams: AddProjectType = {
      name: projectName,
      active: true,
      dateCreated: Date.now(),
      lastUpdatedDate: Date.now(),
      teams: teamForm.map((team) => ({
        teamName: team.teamName,
        teamLead: team.teamLead.value,
        active: true,
        dateCreated: Date.now(),
        lastUpdatedDate: Date.now(),
        teamMembers: team.teamMembers.map(({ id }) => id),
      })),
    };
    callCreateProject(createProjectParams);
  };

  const updateProject = (projectName: string, teamForm: TeamObject[]) => {
    const updateProjectParams = {
      name: projectName,
      projectId: selectedProject?.projectId,
      dateCreated: selectedProject?.dateCreated,
      lastUpdatedDate: Date.now(),
      active: selectedProject?.active,
      teams: teamForm.map(
        ({
          teamName,
          teamId,
          teamLead,
          active,
          dateCreated,
          lastUpdatedDate,
          ...team
        }) => ({
          projectId: selectedProject?.projectId,
          teamId: teamId ?? null,
          active: active ?? true,
          teamName,
          teamLead: teamLead.value,
          dateCreated: dateCreated ?? Date.now(),
          lastUpdatedDate: lastUpdatedDate ?? Date.now(),
          teamMembers: team.teamMembers.map(({ id }) => id),
        })
      ),
    };
    callUpdateProject(updateProjectParams);
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

  const projecAPIStatus = (prop: keyof APIStatus): boolean | APIError => {
    return createProjectStatus[prop] || updateProjectStatus[prop];
  };

  const isErrorField = (field: string): boolean => {
    return projectForm.errors[field as keyof {}] ? true : false;
  };

  useEffect(() => {
    if (selectedProject) {
      projectForm.setValues(SetProjectForm(selectedProject));
    }
  }, [selectedProject]);

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
              onClick={handleAddEditProject}
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              onClick={onValidateForm}
              disabled={projecAPIStatus("loading") as boolean}
            >
              {projecAPIStatus("loading")
                ? "Loading..."
                : (selectedProject ? "Update" : "Add") + " Project"}
            </CustomButton>
          </Stack>
          {!projecAPIStatus("loading") && (
            <ErrorMessage
              error={
                useErrorHandler(projecAPIStatus("error") as APIError, t) ||
                t(addProjectErrorMsg)
              }
              type="alert"
            />
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


