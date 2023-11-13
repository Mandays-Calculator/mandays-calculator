import { type ReactElement } from "react";
import { CustomButton } from "~/components/form/button";
import AvatarImg from "~/assets/img/add-edit-avatar.png";
import { Box, Dialog, Grid, Stack, Typography, styled } from "@mui/material";
import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { UserListData } from "~/api/user-management/types";
import { genders, rolesData } from "../utils";
import { useFormikContext } from "formik";
import { UserManagementForms } from "~/pages/user-management/types";
import { useEditUser } from "~/queries/user-management/UserManagement";

const StyledModalTitle = styled(Typography)({
  fontWeight: 600,
  fontStyle: "normal",
  fontFamily: "Montserrat",
  color: "#414145",
  fontSize: "1.125rem",
  paddingBottom: "18px",
});
const StyledTitle = styled(Typography)({
  color: "#414145",
  fontSize: 14,
  fontFamily: "Montserrat",
  fontWeight: "400",
  wordWrap: "break-word",
});

interface EditUserModalProps {
  onEditUser: () => void;
  open: boolean;
  onClose: () => void;
  currentUser?: UserListData;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  onClose,
  currentUser,
}): ReactElement => {
  const { values } = useFormikContext<UserManagementForms>();
  const EditUser = useEditUser(currentUser?.id ?? "");

  const EditUserForm: UserManagementForms = {
    firstName: values?.UpdateFirstName ?? "",
    lastName: values?.UpdateLastName ?? "",
    middleName: values?.UpdateMiddleName ?? "",
    suffix: values?.UpdateSuffix ?? "",
    gender: 1,
    email: values?.UpdateEmail ?? "",
    employeeId: values?.UpdateEmployeeId ?? "",
    odcId: values?.UpdateOdcId ?? "",
    careerStep: values?.UpdateCareerStep ?? "",
    joiningDate: values?.UpdateJoiningDate ?? "",
    projectId: values?.UpdateProjectId ?? "",
    teamId: values?.UpdateTeamId ?? "",
    roles: values?.UpdateRoles ?? [],
  };

  return (
    <Dialog maxWidth={"md"} open={open} onClose={onClose}>
      <Stack width={"58rem"} padding={"2rem"}>
        <StyledModalTitle>Edit User</StyledModalTitle>
        <Grid container columnSpacing={1.5} rowGap={1}>
          <Grid item xs={3.5}>
            <Stack>
              <img height="175px" width="175px" alt={"name"} src={AvatarImg} />
            </Stack>
          </Grid>
          <Grid container item xs={8.5} columnSpacing={1.5} rowGap={0.5}>
            <Grid item xs={6}>
              <ControlledTextField
                name="UpdateLastName"
                label="Last Name"
                placeholder="Dela Cruz"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="UpdateFirstName"
                label="First Name"
                placeholder=" Juan"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="UpdateMiddleName"
                label="Middle Name"
                placeholder="Jose"
              />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextField
                name="UpdateSuffix"
                label="Suffix"
                placeholder="Jr"
              />
            </Grid>
            <Grid item xs={3}>
              <StyledTitle mb={0.5}>Gender</StyledTitle>
              <ControlledSelect
                name="UpdateGender"
                options={genders}
                placeholder="Male"
              />
            </Grid>
          </Grid>
          <Grid item xs={10} mt={1}>
            <ControlledTextField
              name="UpdateEmail"
              label="Email Address"
              placeholder="juandelacruz103@gmail.com"
            />
          </Grid>
          <Grid item xs={2} mt={1}>
            <ControlledTextField
              name="UpdateCareerStep"
              label="Carrer Step"
              placeholder="I03"
            />
          </Grid>
          <Grid item xs={5}>
            <ControlledTextField
              name="UpdateEmployeeId"
              label="Employee Id"
              placeholder="82000000"
            />
          </Grid>
          <Grid item xs={5}>
            <ControlledTextField
              name="UpdateOdcId"
              label="ODC"
              placeholder="philippines"
            />
          </Grid>

          <Grid item xs={2} fontSize={"5px"}>
            <StyledTitle mb={1}>Joining Date</StyledTitle>

            <ControlledDatePicker
              name="UpdateDate"
              placeholderText="2023/12/31"
              dateFormat="yyyy/MM/dd"
            />
          </Grid>
          <Grid item xs={7.7}>
            <ControlledTextField
              name="UpdateProjectName"
              label="Project"
              placeholder="eMPF"
            />
          </Grid>
          <Grid item xs={4.3}>
            <ControlledTextField
              name="UpdateTeamName"
              label="Team"
              placeholder="Developer Team"
            />
          </Grid>
          <Grid item xs={5}>
            <StyledTitle mb={1}>Role</StyledTitle>
            <ControlledSelect
              multiple
              options={rolesData}
              name="UpdateRoles"
              placeholder="Sprint manager"
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" my={2}>
          <CustomButton
            variant="contained"
            colorVariant="neutral"
            onClick={onClose}
            style={{ marginRight: 16 }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            variant="contained"
            color="primary"
            onClick={() => {
              console.log("test", EditUserForm);

              EditUser.mutate(EditUserForm, {
                onSuccess: (data) => {
                  console.log("success", data);
                  alert("sucess");
                },
                onError: (error) => {
                  alert(error.message);
                  console.log(error);
                },
              });
            }}
          >
            Save
          </CustomButton>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default EditUserModal;
