import { useState, type ReactElement } from "react";
import { CustomButton } from "~/components/form/button";
import {
  Box,
  Button,
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
import { ErrorMessage, FormikInstance, useFormikContext } from "formik";
import { UserManagementForms } from "~/pages/user-management/types";

import { genders, rolesData } from "../utils";
import moment from "moment";
import { Alert, AlertTypes, ImageUpload } from "~/components";
import { getFieldError } from "~/components/form/utils";
import { useRequestHandler } from "~/hooks/request-handler";
import { useAddUser } from "~/queries/user-management/UserManagement";
import { useErrorHandler } from "~/hooks/error-handler";
import { t } from "i18next";

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
  form: FormikInstance<UserManagementForms>;
  onSubmit: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
  form,
  onSubmit,
}): ReactElement => {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({
    lastName: false,
    firstName: false,
    gender: false,
    careerStep: false,
    employeeId: false,
  });
  const AddUser = useAddUser();

  const [status] = useRequestHandler(AddUser.mutate);
  console.log(status);
  const [addUserStatus, setAddUserStatus] = useState({
    status: "",
    message: "",
    show: false,
  });

  const errorMessage = {
    lastName: "Last Name is required",
    firstName: "First Name is required",
    gender: "Gender is required",
    careerStep: "Career Step is required",
    employeeId: "Employee ID is required",
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const { values, setFieldValue } = useFormikContext<UserManagementForms>();
  const gender = () => {
    if (values.gender == "FEMALE") {
      return 1;
    } else if (values.gender == "MALE") {
      return 2;
    } else if (values.gender == "NON_BINARY") {
      return 3;
    } else if (values.gender == "PREFER_NOT_TO_SAY") {
      return 4;
    }
  };
  const AddUserForm: UserManagementForms = {
    firstName: values.firstName,
    lastName: values.lastName,
    middleName: values.middleName,
    suffix: values.suffix,
    gender: gender() ?? 0,
    // image: values.image,
    email: values.email,
    employeeId: values.employeeId,
    odcId: values.odcId,
    careerStep: values.careerStep,
    joiningDate: values.joiningDate,
    projectId: values.projectId,
    teamId: values.teamId,
    roles: values.roles,
  };

  const validateForm = (): boolean => {
    let requiredError = false;
    let requiredErrors = { ...errors };
    for (const field in errors) {
      console.log(errors, "errors");
      if (AddUserForm[field as keyof UserManagementForms] === "") {
        requiredErrors = { ...requiredErrors, ...{ [field]: true } };
        requiredError = true;
      } else {
        requiredErrors = { ...requiredErrors, ...{ [field]: false } };
      }
    }
    setErrors(requiredErrors);
    return requiredError;
  };

  console.log(form);

  return (
    <Dialog maxWidth={"md"} open={open} onClose={onClose}>
      <Stack width={"58rem"} padding={"2rem"}>
        <StyledModalTitle>Add User</StyledModalTitle>
        <Grid container columnSpacing={1.5} rowGap={1}>
          <Grid item xs={3.5}>
            <Stack>
              <ImageUpload name="image" setFieldValue={setFieldValue} />
            </Stack>
          </Grid>
          <Grid container item xs={8.5} columnSpacing={1.5} rowGap={0.5}>
            <Grid item xs={6}>
              <ControlledTextField
                name="lastName"
                label="Last Name"
                placeholder="Dela Cruz"
                error={errors.lastName}
                helperText={getFieldError(
                  form.errors as any, // need to fix your type here
                  "lastName"
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="firstName"
                label="First Name"
                placeholder="Juan"
                error={errors.firstName}
                helperText={errors.firstName && errorMessage.firstName}
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
              <StyledTitle mb={0.5}>Gender</StyledTitle>
              <ControlledSelect
                name="gender"
                options={genders}
                placeholder="Male"
                error={errors.gender}
                helperText={errors.gender && errorMessage.gender}
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
              error={errors.careerStep}
              helperText={errors.careerStep && errorMessage.careerStep}
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
                {value == "recentlyJoined" ? (
                  <ControlledDatePicker
                    name="joiningDate"
                    value={moment().format("yyyy/MM/D")}
                    placeholderText="2023/12/31"
                    dateFormat="yyyy/MM/dd"
                    disabled
                  />
                ) : (
                  <ControlledDatePicker
                    name="joiningDate"
                    placeholderText="2023/12/31"
                    dateFormat="yyyy/MM/dd"
                  />
                )}
              </Stack>
            </FormControl>
          </Grid>
          <Grid item xs={3.5}>
            <ControlledTextField
              name="employeeId"
              label="Employee Id"
              placeholder="82000000"
              error={errors.employeeId}
              helperText={errors.employeeId && errorMessage.employeeId}
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
            <StyledTitle mb={0.5}>Role</StyledTitle>
            <ControlledSelect
              multiple
              options={rolesData}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Add User
          </Button>

          {/* <NotificationModal
            onConfirm={() => {
              setAddUserStatus({
                status: "",
                message: "",
                show: false,
              });
              onClose();
            }}
          /> */}
        </Box>
      </Stack>
    </Dialog>
  );
};

export default AddUserModal;
