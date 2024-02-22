import type { ReactElement } from "react";
import type { UserListData } from "~/api/user-management/types";
import type {
  UpdateUserManagementParams,
  UserManagementForms,
} from "~/pages/user-management/types";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, Dialog, Grid, Stack, Typography, styled } from "@mui/material";
import { useFormikContext } from "formik";
import moment from "moment";

import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { CustomButton } from "~/components/form/button";
import { useUserList } from "~/queries/user-management/UserManagement";
import { useEditUser } from "~/mutations/user-management";
import { useRequestHandler } from "~/hooks/request-handler";
import { Alert, ImageUpload } from "~/components";
import LocalizationKey from "~/i18n/key";
import {
  genderValueNumToStr,
  commonOptionsAPI,
  roleValue,
  renderGender,
} from "~/pages/user-management/utils";

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
  const { values } = useFormikContext<UserManagementForms>();
  const { refetch } = useUserList();

  const [isEditSuccess, setIsEditSuccess] = useState<boolean>(false);
  const [isEditError, setIsEditError] = useState<boolean>(false);
  const EditUser = useEditUser(currentUser?.id ?? "");
  console.log(EditUser, "edit user");
  const [status, callApi] = useRequestHandler(
    EditUser.mutate,
    () => setIsEditSuccess(true),
    () => setIsEditError(true),
  );
  const projectOptions = commonOptionsAPI("project");
  const teamOptions = commonOptionsAPI("team");
  console.log(values, "values");
  const EditUserForm: UserManagementForms = {
    firstName: values?.updateFirstName ?? "",
    lastName: values?.updateLastName ?? "",
    middleName: values?.updateMiddleName ?? "",
    suffix: values?.updateSuffix ?? "",
    gender: Number(values?.updateGender) ?? 0,
    email: values?.updateEmail ?? "",
    employeeId: values?.updateEmployeeId ?? "",
    odcId: values?.updateOdcId ?? "",
    careerStep: values?.updateCareerStep ?? "",
    joiningDate: moment(values?.updateJoiningDate).format("YYYY-MM-DD") ?? date,
    projectId: values?.updateProjectId ?? "",
    teamId: values?.updateTeamId ?? "",
    roles: values?.updateRoles ?? [],
    image: values.updateImage || "",
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
      updateImage: currentUser?.image ?? "",
      updateEmployeeId: currentUser?.employeeId ?? "",
      updateOdcId: currentUser?.odc?.id ?? "",
      updateJoiningDate:
        moment(currentUser?.joiningDate).format("YYYY-MM-DD") ?? "",
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
              <ImageUpload
                name="updateImage"
                initialValue={currentUser?.image ?? ""}
                setFieldValue={form.setFieldValue}
              />
            </Stack>
          </Grid>
          <Grid container item xs={8.5} columnSpacing={1.5} rowGap={0.5}>
            <Grid item xs={6}>
              <ControlledTextField
                name="updateLastName"
                label={t(userManagement.label.lastName)}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="updateFirstName"
                label={t(userManagement.label.firstName)}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="updateMiddleName"
                label={t(userManagement.label.middleName)}
              />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextField
                name="updateSuffix"
                label={t(userManagement.label.suffix)}
              />
            </Grid>
            <Grid item xs={3}>
              <StyledTitle mb={0.5}>
                {t(userManagement.label.gender)}
              </StyledTitle>
              <ControlledSelect
                name="updateGender"
                options={genderValueNumToStr()}
                value={renderGender(form.values.updateGender) || ""}
              />
            </Grid>
          </Grid>
          <Grid item xs={10} mt={1}>
            <ControlledTextField
              name="updateEmail"
              label={t(userManagement.label.email)}
            />
          </Grid>
          <Grid item xs={2} mt={1}>
            <StyledTitle mb={0.5}>
              {t(userManagement.label.careerStep)}
            </StyledTitle>
            <ControlledSelect
              options={commonOptionsAPI("career_step")}
              name="updateCareerStep"
              value={form.values.updateCareerStep || ""}
            />
          </Grid>
          <Grid item xs={5}>
            <ControlledTextField
              name="updateEmployeeId"
              label={t(userManagement.label.employeeId)}
            />
          </Grid>
          <Grid item xs={5}>
            <StyledTitle mb={0.5}>{t(userManagement.label.odcId)}</StyledTitle>
            <ControlledSelect
              options={commonOptionsAPI("odc")}
              name="updateOdcId"
              value={form.values.updateOdcId || ""}
            />
          </Grid>

          <Grid item xs={2} fontSize={"5px"}>
            <StyledTitle mb={1}>
              {t(userManagement.label.joiningDateEdit)}
            </StyledTitle>

            <ControlledDatePicker
              name="updateJoiningDate"
              dateFormat="MM/dd/yyyy"
            />
          </Grid>
          <Grid item xs={7.7}>
            <StyledTitle mb={0.5}>
              {t(userManagement.label.projectId)}
            </StyledTitle>
            <ControlledSelect
              options={projectOptions}
              value={form.values.updateProjectId || ""}
              name="updateProjectName"
            />
          </Grid>
          <Grid item xs={4.3}>
            <StyledTitle mb={0.5}>{t(userManagement.label.teamId)}</StyledTitle>
            <ControlledSelect
              options={teamOptions}
              name="updateTeamName"
              value={form.values.updateTeamId || ""}
            />
          </Grid>
          <Grid item xs={5}>
            <StyledTitle mb={1}>{t(userManagement.label.roles)}</StyledTitle>
            <ControlledSelect
              multiple
              options={roleValue()}
              name="updateRoles"
              value={
                Array.isArray(form.values.updateRoles)
                  ? form.values.updateRoles
                  : []
              }
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
