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
import { SearchSelect } from "~/components/form";

const StyledTextField = styled(ControlledTextField)(() => ({
  width: "50%",
}));
const AddProject = (): ReactElement => {
  const projectForm = useFormik<AddTeamFormType>({
    initialValues: addFormInitValue,
    onSubmit: (val) => console.log(val),
  });
  const [showTeamForm, setShowTeamForm] = useState<boolean>(false);
  return (
    <PageContainer>
      <Form instance={projectForm}>
        <StyledTextField
          name="projectName"
          placeholder="Enter keyword here..."
          label="Project Name"
        />
        <TeamList />
        <Grid paddingY={2}></Grid>
        <SearchSelect
          name="Test"
          options={[
            {
              label: "test 1",
              value: "1",
            },
            {
              label: "test 2",
              value: "1",
            },
          ]}
        />
        {showTeamForm ? (
          <AddTeamForm onCancel={() => setShowTeamForm(false)} />
        ) : (
          <StyledContainer
            $isDefault
            $isAdd
          >
            <IconButton onClick={() => setShowTeamForm(true)}>
              <SvgIcon
                name="add"
                color="primary"
              />

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
          >
            Cancel
          </CustomButton>
          <CustomButton type="submit">Add Project</CustomButton>
        </Stack>
      </Form>
    </PageContainer>
  );
};

export default AddProject;
