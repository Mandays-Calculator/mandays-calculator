import { type ReactElement, useEffect, useState } from "react";
import { CustomButton } from "~/components/form/button";
import { Box, Dialog, Grid, Stack, Typography, styled } from "@mui/material";
import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { useFormikContext } from "formik";
import {
  UpdateUserManagementParams,
  UserManagementForms,
} from "~/pages/user-management/types";
import { useUserList } from "~/queries/user-management/UserManagement";

import { gender } from "~/pages/user-management/utils";
import { ImageUpload } from "~/components";
import { UserListData } from "~/api/user-management/types";
import { useEditUser } from "~/mutations/user-management";
import { useRequestHandler } from "~/hooks/request-handler";
import { Alert } from "~/components";
import { useTranslation } from "react-i18next";
import LocalizationKey from "~/i18n/key";
import moment from "moment";
import { genders, rolesData } from "~/utils/constants";

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
  const date = moment(currentUser?.joiningDate).format("YYYY-MM-DD");
  const { t } = useTranslation();
  const { userManagement } = LocalizationKey;
  const { values, setFieldValue } = useFormikContext<UserManagementForms>();
  const { refetch } = useUserList();
  const [isEditSuccess, setIsEditSuccess] = useState<boolean>(false);
  const [isEditError, setIsEditError] = useState<boolean>(false);
  const EditUser = useEditUser(currentUser?.id ?? "");
  const [status, callApi] = useRequestHandler(
    EditUser.mutate,
    () => setIsEditSuccess(true),
    () => setIsEditError(true)
  );

  const EditUserForm: UserManagementForms = {
    firstName: values?.updateFirstName ?? "",
    lastName: values?.updateLastName ?? "",
    middleName: values?.updateMiddleName ?? "",
    suffix: values?.updateSuffix ?? "",
    gender: gender(values?.updateGender) ?? 0,
    email: values?.updateEmail ?? "",
    employeeId: values?.updateEmployeeId ?? "",
    odcId: values?.updateOdcId ?? "",
    careerStep: values?.updateCareerStep ?? "",
    joiningDate: moment(values?.updateJoiningDate).format("YYYY-MM-DD") ?? date,
    projectId: values?.updateProjectId ?? "",
    teamId: values?.updateTeamId ?? "",
    roles: values?.updateRoles ?? [],
  };
  const submit = () => {
    callApi(EditUserForm);
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
      updateEmployeeId: currentUser?.employeeId ?? "",
      updateOdcId: "",
      updateCareerStep: currentUser?.careerStep ?? "",
      updateProjectId: "",
      updateTeamId: "",
      updateRoles: currentUser?.roles ?? [],
    });
  }, [currentUser]);

  useEffect(() => {
    if (isEditSuccess) {
      setTimeout(() => {
        onClose(), refetch(), setIsEditSuccess(false);
      }, 1000);
    }
    if (isEditError) {
      setIsEditError(false);
    }
  }, [isEditSuccess, isEditError]);

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
                label={t(userManagement.label.lastName)}
                placeholder="Dela Cruz"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="updateFirstName"
                label={t(userManagement.label.firstName)}
                placeholder=" Juan"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="updateMiddleName"
                label={t(userManagement.label.middleName)}
                placeholder="Jose"
              />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextField
                name="updateSuffix"
                label={t(userManagement.label.suffix)}
                placeholder="Jr"
              />
            </Grid>
            <Grid item xs={3}>
              <StyledTitle mb={0.5}>
                {t(userManagement.label.gender)}
              </StyledTitle>
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
              label={t(userManagement.label.email)}
              placeholder="juandelacruz103@gmail.com"
            />
          </Grid>
          <Grid item xs={2} mt={1}>
            <ControlledTextField
              name="updateCareerStep"
              label={t(userManagement.label.careerStep)}
              placeholder="I03"
            />
          </Grid>
          <Grid item xs={5}>
            <ControlledTextField
              name="updateEmployeeId"
              label={t(userManagement.label.employeeId)}
              placeholder="82000000"
            />
          </Grid>
          <Grid item xs={5}>
            <ControlledTextField
              name="updateOdcId"
              label={t(userManagement.label.odcId)}
              placeholder="philippines"
            />
          </Grid>

          <Grid item xs={2} fontSize={"5px"}>
            <StyledTitle mb={1}>
              {t(userManagement.label.joiningDateEdit)}
            </StyledTitle>

            <ControlledDatePicker
              name="updateJoiningDate"
              placeholderText={date}
              dateFormat="MM/dd/yyyy"
            />
          </Grid>
          <Grid item xs={7.7}>
            <ControlledTextField
              name="updateProjectName"
              label={t(userManagement.label.projectId)}
              placeholder="eMPF"
            />
          </Grid>
          <Grid item xs={4.3}>
            <ControlledTextField
              name="updateTeamName"
              label={t(userManagement.label.teamId)}
              placeholder="Developer Team"
            />
          </Grid>
          <Grid item xs={5}>
            <StyledTitle mb={1}>{t(userManagement.label.roles)}</StyledTitle>
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
          <CustomButton variant="contained" color="primary" onClick={submit}>
            Save
          </CustomButton>
          {!status.loading && (
            <>
              <Alert
                open={isEditError}
                message={
                  "There is a problem in your submitted data. Please check"
                }
                type={"error"}
              />
              <Alert
                open={isEditSuccess}
                message={"User successfully updated"}
                type={"success"}
              />
            </>
          )}
        </Box>
      </Stack>
    </Dialog>
  );
};

export default EditUserModal;
