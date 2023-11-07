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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const { values } = useFormikContext<AddUserManagement>();
  const AddUserForm: AddUserManagement = {
    firstName: values.firstName,
    lastName: values.lastName,
    middleName: values.middleName,
    suffix: values.suffix,
    gender: values.gender,
    email: values.email,
    careerStep: values.careerStep,
    // joiningDate: "",
    // projectId: values.projectName,
    // teamId: values.teamName,
    // roles: ["ROLE_SYS_ADMIN"],
  };
  const rolesDummyData = [
    {
      label: "User",
      value: "User",
    },
    {
      label: "Sprint Manager",
      value: "Sprint Manager",
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
              name="emailAddress"
              label="Email Address"
              placeholder="juandelacruz103@gmail.com"
            />
          </Grid>
          <Grid item xs={3} mt={1}>
            <ControlledTextField
              name="carrerStep"
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
                <ControlledDatePicker name="date" placeholderText="01/01/23" />
              </Stack>
            </FormControl>
          </Grid>
          <Grid item xs={3.5}>
            <ControlledTextField
              name="EmployeeId"
              label="Employee Id"
              placeholder="82000000"
            />
          </Grid>
          <Grid item xs={3.5}>
            <ControlledTextField
              name="Odc"
              label="ODC"
              placeholder="philippines"
            />
          </Grid>
          <Grid item xs={5}>
            <StyledTitle mb={1}>Role</StyledTitle>
            <ControlledSelect
              multiple
              options={rolesDummyData}
              name="roleName"
              placeholder="Sprint Manager"
            />
          </Grid>
          <Grid item xs={7}>
            <ControlledTextField
              name="projectName"
              label="Project"
              placeholder="eMPF"
            />
          </Grid>
          <Grid item xs={5}>
            <ControlledTextField
              name="teamName"
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
              console.log(AddUserForm);
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
