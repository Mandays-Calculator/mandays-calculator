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
  onEditUser,
  open,
  onClose,
  currentUser,
}): ReactElement => {
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
                name="lastName"
                label="Last Name"
                placeholder={currentUser?.lastName}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="firstName"
                label="First Name"
                placeholder={currentUser?.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="middleName"
                label="Middle Name"
                placeholder={currentUser?.middleName}
              />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextField
                name="suffix"
                label="Suffix"
                placeholder={currentUser?.suffix}
              />
            </Grid>
            <Grid item xs={3}>
              <StyledTitle mb={0.5}>Gender</StyledTitle>
              <ControlledSelect
                name="gender"
                options={genders}
                placeholder={currentUser?.gender}
              />
            </Grid>
          </Grid>
          <Grid item xs={10} mt={1}>
            <ControlledTextField
              name="emailAddress"
              label="Email Address"
              placeholder={currentUser?.email}
            />
          </Grid>
          <Grid item xs={2} mt={1}>
            <ControlledTextField
              name="carrerStep"
              label="Carrer Step"
              placeholder={currentUser?.careerStep}
            />
          </Grid>
          <Grid item xs={5}>
            <ControlledTextField
              name="EmployeeId"
              label="Employee Id"
              placeholder={currentUser?.employeeId}
            />
          </Grid>
          <Grid item xs={5}>
            <ControlledTextField
              name="Odc"
              label="ODC"
              placeholder="philippines"
            />
          </Grid>

          <Grid item xs={2} fontSize={"5px"}>
            <StyledTitle mb={1}>Joining Date</StyledTitle>

            <ControlledDatePicker
              name="date"
              placeholderText={currentUser?.joiningDate}
              dateFormat="yyyy/MM/dd"
            />
          </Grid>
          <Grid item xs={7.7}>
            <ControlledTextField
              name="projectName"
              label="Project"
              placeholder="eMPF"
            />
          </Grid>
          <Grid item xs={4.3}>
            <ControlledTextField
              name="teamName"
              label="Team"
              placeholder="Developer Team"
            />
          </Grid>
          <Grid item xs={5}>
            <StyledTitle mb={1}>Role</StyledTitle>
            <ControlledSelect
              multiple
              options={rolesData}
              name="roles"
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
            onClick={onEditUser}
          >
            Save
          </CustomButton>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default EditUserModal;
