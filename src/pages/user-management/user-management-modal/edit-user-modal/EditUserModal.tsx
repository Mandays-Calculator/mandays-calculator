import type { ReactElement } from "react";
import type {
  UpdateUserManagementParams,
  UserManagementForms,
} from "~/pages/user-management/types";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, Dialog, Grid, Stack } from "@mui/material";
import { useFormikContext } from "formik";
import moment from "moment";

import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { CustomButton } from "~/components/form/button";

import {
  useUserByID,
  useUserList,
} from "~/queries/user-management/UserManagement";

import { useEditUser } from "~/mutations/user-management";
import { useRequestHandler } from "~/hooks/request-handler";
import { ImageUpload } from "~/components";
import LocalizationKey from "~/i18n/key";

import {
  genderValueNumToStr,
  commonOptionsAPI,
  roleValue,
  renderGender,
} from "~/pages/user-management/utils";

import { StyledModalTitle, StyledTitle } from "./styles";
import AlertRenderer from "./AlertRenderer";

interface EditUserModalProps {
  onEditUser: () => void;
  open: boolean;
  onClose: () => void;
  userId: string;
}
export const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  onClose,
  userId,
}): ReactElement => {
  const { t } = useTranslation();
  const { userManagement } = LocalizationKey;
  const { values } = useFormikContext<UserManagementForms>();
  const { refetch } = useUserList();
  const selectedUser = useUserByID(userId);

  const currentUser = selectedUser.data?.data;

  const date = moment(currentUser?.joiningDate).format("YYYY-MM-DD");
  const [isEditSuccess, setIsEditSuccess] = useState<boolean>(false);
  const [isEditError, setIsEditError] = useState<boolean>(false);
  const EditUser = useEditUser(currentUser?.id ?? "");
  const [status, callApi] = useRequestHandler(
    EditUser.mutate,
    () => setIsEditSuccess(true),
    () => setIsEditError(true),
  );
  const projectOptions = commonOptionsAPI("project");
  const teamOptions = commonOptionsAPI("team");

  const EditUserForm: UserManagementForms = {
    firstName: values?.updateFirstName ?? "",
    lastName: values?.updateLastName ?? "",
    middleName: values?.updateMiddleName ?? "",
    suffix: values?.updateSuffix ?? "",
    gender: isNaN(Number(values.updateGender))
      ? renderGender(values?.updateGender)
      : Number(values.updateGender),
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

  const submit = async () => {
    callApi(EditUserForm);
  };

  const form = useFormikContext<UpdateUserManagementParams>();

  useEffect(() => {
    form.setValues({
      updateFirstName: currentUser?.firstName ?? "",
      updateLastName: currentUser?.lastName ?? "",
      updateMiddleName: currentUser?.middleName ?? "",
      updateSuffix: currentUser?.suffix ?? "",
      updateGender: renderGender(currentUser?.gender) ?? "",
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
        <StyledModalTitle>{t(userManagement.label.editUser)}</StyledModalTitle>
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
                placeholder="Gender"
                options={genderValueNumToStr()}
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
            {t(userManagement.label.cancel)}
          </CustomButton>
          <CustomButton variant="contained" color="primary" onClick={submit}>
            {t(userManagement.label.save)}
          </CustomButton>
          <AlertRenderer
            status={status}
            isEditError={isEditError}
            isEditSuccess={isEditSuccess}
            selectedUser={selectedUser}
          />
        </Box>
      </Stack>
    </Dialog>
  );
};

export default EditUserModal;
