import type { ReactElement } from "react";
import { type FormikContextType } from "formik";
import type { UserManagementForms } from "~/pages/user-management/types";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Box,
  Dialog,
  FormControl,
  Grid,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { CustomButton } from "~/components/form/button";
import { Alert, ImageUpload } from "~/components";
import { getFieldError } from "~/components/form/utils";
import { FormErrors } from "~/components/form/types";
import { APIStatus } from "~/hooks/request-handler";
import LocalizationKey from "~/i18n/key";
import {
  genderValueNumToStr,
  commonOptionsAPI,
  roleValue,
} from "~/pages/user-management/utils";
import { useCommonOption } from "~/queries/common/options";

import {
  StyledModalTitle,
  StyledError,
  StyledTitle,
  StyledFormControlLabel,
} from "./styles";

interface AddUserModalProps {
  onAddUser: () => void;
  open: boolean;
  onClose: () => void;
  form: FormikContextType<UserManagementForms>;
  OnSubmit: () => void;
  status: APIStatus;
  isSuccess: boolean;
  isError: boolean;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
  form,
  OnSubmit,
  status,
  isSuccess,
  isError,
}): ReactElement => {
  const { t } = useTranslation();
  const { userManagement, common } = LocalizationKey;
  const [selectedJoinedDate, setSelectedJoinedDate] =
    useState("recentlyJoined");

  const careerStepOptions = commonOptionsAPI("career_step");
  const odcOptions = commonOptionsAPI("odc");
  const projectOptions = commonOptionsAPI("project");
  const projectId = form.values.projectId;
  const teamOptions = useCommonOption("team", { projectId });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedJoinedDate(event.target.value);

    form.setFieldValue(
      "recentlyJoinedlaterDate",
      event.target.value === "recentlyJoinedlaterDate" ? true : false,
    );
  };

  const renderAlert = (): ReactElement | undefined => {
    if (!isSuccess) {
      return (
        <Alert
          open={isError}
          message={t(common.errorMessage.genericErrorSubmit)}
          type={"error"}
        />
      );
    }
    return (
      <Alert
        open={isSuccess}
        message={t(userManagement.successMessage.addUser)}
        type={"success"}
      />
    );
  };
  return (
    <Dialog maxWidth={"md"} open={open} onClose={onClose}>
      <Stack width={"58rem"} padding={"2rem"}>
        <StyledModalTitle>{t(userManagement.label.addUser)}</StyledModalTitle>
        <Grid container columnSpacing={1.5} rowGap={1}>
          <Grid item xs={3.5}>
            <Stack>
              <ImageUpload
                name="image"
                initialValue=""
                setFieldValue={form.setFieldValue}
              />
            </Stack>
          </Grid>
          <Grid container item xs={8.5} columnSpacing={1.5} rowGap={0.5}>
            <Grid item xs={6}>
              <ControlledTextField
                name="lastName"
                label={t(userManagement.label.lastName)}
                error={!!form.errors.lastName}
                helperText={getFieldError(
                  form.errors as FormErrors,
                  "lastName",
                )}
                value={form.values.lastName || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextField
                name="firstName"
                label={t(userManagement.label.firstName)}
                error={!!form.errors.firstName}
                helperText={getFieldError(
                  form.errors as FormErrors,
                  "firstName",
                )}
                value={form.values.firstName || ""}
              />
            </Grid>
            <Grid item xs={5}>
              <ControlledTextField
                name="middleName"
                label={t(userManagement.label.middleName)}
                value={form.values.middleName || ""}
              />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextField
                name="suffix"
                label={t(userManagement.label.suffix)}
                value={form.values.suffix || ""}
              />
            </Grid>
            <Grid item xs={4}>
              <StyledTitle mb={0.8}>
                {t(userManagement.label.gender)}
              </StyledTitle>
              <ControlledSelect
                name="gender"
                options={genderValueNumToStr()}
                placeholder="Gender"
                error={!!form.errors.gender}
                value={form.values.gender || ""}
              />
              <StyledError>
                {getFieldError(form.errors as FormErrors, "gender")}
              </StyledError>
            </Grid>
          </Grid>
          <Grid item xs={9} mt={1}>
            <ControlledTextField
              name="email"
              label={t(userManagement.label.email)}
              error={!!form.errors.email}
              helperText={getFieldError(form.errors as FormErrors, "email")}
              value={form.values.email || ""}
            />
          </Grid>
          <Grid item xs={3} mt={1}>
            <StyledTitle mb={0.5}>
              {t(userManagement.label.careerStep)}
            </StyledTitle>
            <ControlledSelect
              options={careerStepOptions}
              name="careerStep"
              error={!!form.errors.careerStep}
              helperText={getFieldError(
                form.errors as FormErrors,
                "careerStep",
              )}
              value={form.values.careerStep || ""}
            />
            <StyledError>
              {getFieldError(form.errors as FormErrors, "careerStep")}
            </StyledError>
          </Grid>
          <Grid item xs={12} mb={1}>
            <FormControl>
              <RadioGroup
                name="controlled-radio-buttons-group"
                value={selectedJoinedDate || ""}
                onChange={handleChange}
              >
                <StyledFormControlLabel
                  value="recentlyJoined"
                  control={<Radio />}
                  label={t(userManagement.label.joiningDate)}
                />
                <StyledFormControlLabel
                  name="recentlyJoinedlaterDate"
                  value="recentlyJoinedlaterDate"
                  control={<Radio />}
                  label={t(userManagement.label.joiningAtLaterDate)}
                />
              </RadioGroup>
              <Stack ml={4.3}>
                {selectedJoinedDate == "recentlyJoined" ? (
                  <ControlledDatePicker
                    name="joiningDate"
                    dateFormat="yyyy/MM/dd"
                    disabled
                  />
                ) : (
                  <ControlledDatePicker
                    name="joiningDate"
                    dateFormat="yyyy/MM/dd"
                    error={!!form.errors.joiningDate}
                    helperText={getFieldError(
                      form.errors as FormErrors,
                      "joiningDate",
                    )}
                  />
                )}
              </Stack>
            </FormControl>
          </Grid>
          <Grid item xs={3.5}>
            <ControlledTextField
              name="employeeId"
              label={t(userManagement.label.employeeId)}
              error={!!form.errors.employeeId}
              helperText={getFieldError(
                form.errors as FormErrors,
                "employeeId",
              )}
              value={form.values.employeeId || ""}
            />
          </Grid>
          <Grid item xs={3.5}>
            <StyledTitle mb={0.5}>{t(userManagement.label.odcId)}</StyledTitle>
            <ControlledSelect
              options={odcOptions}
              name="odcId"
              value={form.values.odcId || ""}
              helperText={getFieldError(form.errors as FormErrors, "odcId")}
            />
            <StyledError>
              {getFieldError(form.errors as FormErrors, "odcId")}
            </StyledError>
          </Grid>
          <Grid item xs={5}>
            <StyledTitle mb={0.5}>{t(userManagement.label.roles)}</StyledTitle>
            <ControlledSelect
              multiple
              options={roleValue()}
              name="roles"
              value={form.values.roles || ""}
            />
            <StyledError>
              {getFieldError(form.errors as FormErrors, "roles")}
            </StyledError>
          </Grid>
          <Grid item xs={7}>
            <StyledTitle mb={0.5}>
              {t(userManagement.label.projectId)}
            </StyledTitle>
            <ControlledSelect
              options={projectOptions}
              name="projectId"
              value={form.values.projectId || ""}
            />
          </Grid>
          {form.values.projectId && (
            <Grid item xs={5}>
              <StyledTitle mb={0.5}>
                {t(userManagement.label.teamId)}
              </StyledTitle>
              <ControlledSelect
                options={teamOptions}
                name="teamId"
                value={form.values.teamId || ""}
              />
            </Grid>
          )}
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
          <CustomButton
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => OnSubmit()}
          >
            {t(userManagement.label.addUser)}
          </CustomButton>
          {!status.loading && renderAlert()}
        </Box>
      </Stack>
    </Dialog>
  );
};

export default AddUserModal;
