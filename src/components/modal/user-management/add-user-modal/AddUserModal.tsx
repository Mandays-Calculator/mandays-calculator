import { useState, type ReactElement } from "react";
import { CustomButton } from "~/components/form/button";
import AvatarImg from "~/assets/img/add-edit-avatar.png";
import {
  Box,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { useFormikContext } from "formik";
import { AddUserManagement } from "~/pages/user-management/types";
import { useAddUser } from "~/queries/user-management/UserManagement";

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
const StyledFormControlLabel = styled(FormControlLabel)({
  height: "35px",
});

interface AddUserModalProps {
  onAddUser: () => void;
  open: boolean;
  onClose: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
}): ReactElement => {
  const [value, setValue] = useState("");

  const AddUser = useAddUser();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const { values } = useFormikContext<AddUserManagement>();
  const AddUserForm: AddUserManagement = {
    firstName: values.firstName,
    lastName: values.lastName,
    middleName: values.middleName,
    suffix: values.suffix,
    gender: 1,
    email: values.email,
    employeeId: values.employeeId,
    odcId: values.odcId,
    careerStep: values.careerStep,
    joiningDate: values.joiningDate,
    projectId: values.projectId,
    teamId: values.teamId,
    roles: values.roles,
  };
  const rolesDummyData = [
    {
      label: "System Admin",
      value: "ROLE_SYS_ADMIN",
    },
    {
      label: "Sprint Manager",
      value: "ROLE_SPRINT_MANAGER",
    },
    {
      label: "User",
      value: "ROLE_USER",
    },
  ];

  return (
    <Dialog maxWidth={"md"} open={open} onClose={onClose}>
      <Stack width={"53rem"} padding={"2rem"}>
        <StyledModalTitle>Add User</StyledModalTitle>
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
                placeholder="Dela Cruz"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="firstName"
                label="First Name"
                placeholder="Juan"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="middleName"
                label="Middle Name"
                placeholder="Jose"
              />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextField
                name="suffix"
                label="Suffix"
                placeholder="Jr"
              />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextField
                name="gender"
                label="Gender"
                placeholder="Male"
              />
            </Grid>
          </Grid>
          <Grid item xs={9} mt={1}>
            <ControlledTextField
              name="email"
              label="Email Address"
              placeholder="juandelacruz103@gmail.com"
            />
          </Grid>
          <Grid item xs={3} mt={1}>
            <ControlledTextField
              name="careerStep"
              label="Carrer Step"
              placeholder="I03"
            />
          </Grid>
          <Grid item xs={12} mb={1}>
            <FormControl>
              <RadioGroup
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <StyledFormControlLabel
                  value="recentlyJoined"
                  control={<Radio />}
                  label="User recently joined the organization"
                />
                <StyledFormControlLabel
                  value="recentlyJoinedlaterDate"
                  control={<Radio />}
                  label="User recently joined the organization at a later date"
                />
              </RadioGroup>
              <Stack ml={4.3}>
                <ControlledDatePicker
                  name="joiningDate"
                  placeholderText="01/01/23"
                  dateFormat="yyyy/MM/dd"
                />
              </Stack>
            </FormControl>
          </Grid>
          <Grid item xs={3.5}>
            <ControlledTextField
              name="employeeId"
              label="Employee Id"
              placeholder="82000000"
            />
          </Grid>
          <Grid item xs={3.5}>
            <ControlledTextField
              name="odcId"
              label="ODC"
              placeholder="philippines"
            />
          </Grid>
          <Grid item xs={5}>
            <StyledTitle mb={1}>Role</StyledTitle>
            <ControlledSelect
              multiple
              options={rolesDummyData}
              name="roles"
              placeholder="Sprint Manager"
            />
          </Grid>
          <Grid item xs={7}>
            <ControlledTextField
              name="projectId"
              label="Project"
              placeholder="eMPF"
            />
          </Grid>
          <Grid item xs={5}>
            <ControlledTextField
              name="teamId"
              label="Team"
              placeholder="Developer Team"
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
              console.log("test", AddUserForm);

              AddUser.mutate(AddUserForm, {
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
            Add User
          </CustomButton>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default AddUserModal;
