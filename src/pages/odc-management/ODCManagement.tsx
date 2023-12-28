import type { ReactElement } from "react";
import type { OdcParam } from "~/api/odc";
import type { FormContext, SucErrType } from "./utils";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useODCList } from "~/queries/odc/ODC";
import { useDeleteODC } from "~/mutations/odc";
import { PageLoader, Title, PageContainer, ConfirmModal, Alert } from "~/components";
import LocalizationKey from "~/i18n/key";

import AddODC from "./add-list/AddODC";
import ViewODC from "./view-list/ViewODC";
import {
  NewODCData,
  SucErrData,
  HasError,
  HasSuccess,
  MutationOptions
} from "./utils";

const ODCManagement = (): ReactElement => {
  const { t } = useTranslation();
  const {
    odc: { management, validationInfo },
    common: { errorMessage: { genericError } }
  } = LocalizationKey;
  
  const { data: apiData, isLoading, isError } = useODCList();
  const {
    mutate: deleteMutation,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess
  } = useDeleteODC();

  const [initialValues, setInitialValues] = useState<OdcParam>(NewODCData);
  const [formContext, setFormContext] = useState<FormContext>("");
  const [idx, setIdx] = useState<string>("");
  const [successError, setSuccessError] = useState<SucErrType>(SucErrData);

  useEffect(() => {
    if (formContext === "Edit" || formContext === "Delete")
      setInitialValues(apiData?.find((value: OdcParam) => value.id === idx) ?? NewODCData);
    if (formContext === "Add")
      setInitialValues(NewODCData);
  }, [formContext]);

  useEffect(() => {
    MutationOptions(isError, "isOdcError", setSuccessError);
    MutationOptions(isDeleteSuccess, "isDeleteOdcSuccess", setSuccessError);
    MutationOptions(isDeleteError, "isDeleteOdcError", setSuccessError);
  }, [isError, isDeleteSuccess, isDeleteError]);

  const delIdx = apiData?.findIndex((value: OdcParam) => value.id === idx) ?? 0;

  if (isLoading) { return <PageLoader /> };
  return (
    <>
      <Title title={t(management)} />
      <PageContainer sx={{ background: "#FFFFFF" }}>
        {formContext === "" && (
          <ViewODC
            data={apiData || []}
            setFormContext={setFormContext}
            setIdx={setIdx}
          />
        )}
        {(formContext === "Add" || formContext === "Edit") && (
          <AddODC
            apiData={apiData || []}
            data={initialValues}
            formContext={formContext}
            setFormContext={setFormContext}
            setSuccessError={setSuccessError}
          />
        )}
      </PageContainer>
      <ConfirmModal
        onConfirm={(): void => {
          console.log("confirm")
          setFormContext("");
          deleteMutation(idx);
        }}
        open={formContext === "Delete"}
        onClose={() => setFormContext("")}
        selectedRow={delIdx}
      />
      {(successError.isOdcError || successError.isHolidayError) && (
        <Alert
          open={successError.isOdcError || successError.isHolidayError}
          message={t(genericError)}
          type={"error"}
        />
      )}
      {(successError.isDeleteOdcSuccess || successError.isDeleteHolidaySuccess) && (
        <Alert
          open={successError.isDeleteOdcSuccess || successError.isDeleteHolidaySuccess}
          message={t(validationInfo.deleteSuccess)}
          type={"success"}
        />
      )}
      {(successError.isDeleteOdcError || successError.isDeleteHolidayError) && (
        <Alert
          open={successError.isDeleteOdcError || successError.isDeleteHolidayError}
          message={t(validationInfo.deleteError)}
          type={"error"}
        />
      )}
      {HasSuccess(successError) && (
        <Alert
          open={HasSuccess(successError)}
          message={t(validationInfo.submitSuccess)}
          type={"success"}
        />
      )}
      {HasError(successError) && (
        <Alert
          open={HasError(successError)}
          message={t(validationInfo.submitError)}
          type={"error"}
        />
      )}
    </>
  );
};

export default ODCManagement;
