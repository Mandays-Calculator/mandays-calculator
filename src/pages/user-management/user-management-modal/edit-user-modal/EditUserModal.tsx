import { useState, type ReactElement, useEffect } from "react";
import { CustomButton } from "~/components/form/button";
import { Box, Dialog, Grid, Stack, Typography, styled } from "@mui/material";
import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { genders, rolesData } from "../utils";
import { useFormikContext } from "formik";
import {
  UpdateUserManagementParams,
  UserManagementForms,
} from "~/pages/user-management/types";
import {
  useEditUser,
  useUserList,
} from "~/queries/user-management/UserManagement";
import {
  ModalType,
  NotificationModal,
} from "../../../../components/modal/notification-modal";
import { ImageUpload } from "~/components";
import { UserListData } from "~/api/user-management/types";

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
  const { values, setFieldValue } = useFormikContext<UserManagementForms>();
  const { refetch } = useUserList();
  const EditUser = useEditUser(currentUser?.id ?? "");
  const [editUserStatus, setEditUserStatus] = useState({
    status: "",
    message: "",
    show: false,
  });

  const gender = () => {
    if (values.updateGender == "FEMALE") {
      return 1;
    } else if (values.updateGender == "MALE") {
      return 2;
    } else if (values.updateGender == "NON_BINARY") {
      return 3;
    } else if (values.updateGender == "PREFER_NOT_TO_SAY") {
      return 4;
    }
  };
  const EditUserForm: UserManagementForms = {
    firstName: values?.updateFirstName ?? "",
    lastName: values?.updateLastName ?? "",
    middleName: values?.updateMiddleName ?? "",
    suffix: values?.updateSuffix ?? "",
    gender: gender() ?? 0,
    // image: values.updateImage ?? "",
    email: values?.updateEmail ?? "",
    employeeId: values?.updateEmployeeId ?? "",
    odcId: values?.updateOdcId ?? "",
    careerStep: values?.updateCareerStep ?? "",
    joiningDate: values?.updateJoiningDate ?? "",
    projectId: values?.updateProjectId ?? "",
    teamId: values?.updateTeamId ?? "",
    roles: values?.updateRoles ?? [],
  };

  const form = useFormikContext<UpdateUserManagementParams>();
  useEffect(() => {
    form.setValues({
      updateFirstName: currentUser?.firstName ?? "",
      updateLastName: currentUser?.lastName ?? "",
      updateMiddleName: currentUser?.middleName ?? "",
      updateSuffix: currentUser?.suffix ?? "",
      updateGender: currentUser?.gender ?? "",
      updateEmail: currentUser?.email ?? "",
      // updateImage: currentUser?.image ?? "",
      updateEmployeeId: currentUser?.employeeId ?? "",
      updateOdcId: "",
      updateCareerStep: currentUser?.careerStep ?? "",
      updateJoiningDate: currentUser?.joiningDate ?? "",
      updateProjectId: "",
      updateTeamId: "",
      updateRoles: currentUser?.roles ?? [],
    });
  }, [currentUser]);

  return (
    <Dialog maxWidth={"md"} open={open} onClose={onClose}>
      <Stack width={"58rem"} padding={"2rem"}>
        <StyledModalTitle>Edit User</StyledModalTitle>
        <Grid container columnSpacing={1.5} rowGap={1}>
          <Grid item xs={3.5}>
            <Stack>
              <ImageUpload name="updateImage" setFieldValue={setFieldValue} />
            </Stack>
          </Grid>
          <Grid container item xs={8.5} columnSpacing={1.5} rowGap={0.5}>
            <Grid item xs={6}>
              <ControlledTextField
                name="updateLastName"
                label="Last Name"
                placeholder="Dela Cruz"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="updateFirstName"
                label="First Name"
                placeholder=" Juan"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="updateMiddleName"
                label="Middle Name"
                placeholder="Jose"
              />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextField
                name="updateSuffix"
                label="Suffix"
                placeholder="Jr"
              />
            </Grid>
            <Grid item xs={3}>
              <StyledTitle mb={0.5}>Gender</StyledTitle>
              <ControlledSelect
                name="updateGender"
                options={genders}
                placeholder="Male"
              />
            </Grid>
          </Grid>
          <Grid item xs={10} mt={1}>
            <ControlledTextField
              name="updateEmail"
              label="Email Address"
              placeholder="juandelacruz103@gmail.com"
            />
          </Grid>
          <Grid item xs={2} mt={1}>
            <ControlledTextField
              name="updateCareerStep"
              label="Carrer Step"
              placeholder="I03"
            />
          </Grid>
          <Grid item xs={5}>
            <ControlledTextField
              name="updateEmployeeId"
              label="Employee Id"
              placeholder="82000000"
            />
          </Grid>
          <Grid item xs={5}>
            <ControlledTextField
              name="updateOdcId"
              label="ODC"
              placeholder="philippines"
            />
          </Grid>

          <Grid item xs={2} fontSize={"5px"}>
            <StyledTitle mb={1}>Joining Date</StyledTitle>

            <ControlledDatePicker
              name="updateDate"
              placeholderText="2023/12/31"
              dateFormat="yyyy/MM/dd"
            />
          </Grid>
          <Grid item xs={7.7}>
            <ControlledTextField
              name="updateProjectName"
              label="Project"
              placeholder="eMPF"
            />
          </Grid>
          <Grid item xs={4.3}>
            <ControlledTextField
              name="updateTeamName"
              label="Team"
              placeholder="Developer Team"
            />
          </Grid>
          <Grid item xs={5}>
            <StyledTitle mb={1}>Role</StyledTitle>
            <ControlledSelect
              multiple
              options={rolesData}
              name="updateRoles"
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
              EditUser.mutate(EditUserForm, {
                onSuccess: (data) => {
                  setEditUserStatus({
                    status: "success",
                    message: "User successfully updated",
                    show: true,
                  });
                  refetch();
                  console.log("success", data);
                },
                onError: (error) => {
                  setEditUserStatus({
                    status: "error",
                    message: error?.message ?? "Error",
                    show: true,
                  });
                  console.log(error);
                },
              });
            }}
          >
            Save
          </CustomButton>
          <NotificationModal
            type={editUserStatus.status as ModalType}
            message={editUserStatus.message}
            open={editUserStatus.show}
            onConfirm={() => {
              setEditUserStatus({
                status: "",
                message: "",
                show: false,
              });
              onClose();
            }}
          />
        </Box>
      </Stack>
    </Dialog>
  );
};

export default EditUserModal;
