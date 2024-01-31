import type { ReactElement } from "react";
import type { OdcParam } from "~/api/odc";
import type { FormContext, SucErrType } from "./utils";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useCommonOption } from "~/queries/common/options";
import { useODCList } from "~/queries/odc/ODC";
import { useDeleteODC } from "~/mutations/odc";
import {
  PageLoader,
  Title,
  PageContainer,
  ConfirmModal,
  Alert,
} from "~/components";
import LocalizationKey from "~/i18n/key";

import AddODC from "./add-list/AddODC";
import ViewODC from "./view-list/ViewODC";
import {
  NewODCData,
  SucErrData,
  HasError,
  HasSuccess,
  MutationOptions,
} from "./utils";

const ODCManagement = (): ReactElement => {
  const { t } = useTranslation();
  const {
    odc: { management, validationInfo },
    common: {
      errorMessage: { genericError },
    },
  } = LocalizationKey;

  const { data: apiData, isLoading, isError, refetch } = useODCList();
  const {
    mutate: deleteMutation,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
  } = useDeleteODC();
  const countryData = useCommonOption("country");
  const country = countryData?.sort((a: SelectObject, b: SelectObject) =>
    a.label.localeCompare(b.label)
  );

  const [initialValues, setInitialValues] = useState<OdcParam>(NewODCData);
  const [formContext, setFormContext] = useState<FormContext>("");
  const [idx, setIdx] = useState<string>("");
  const [successError, setSuccessError] = useState<SucErrType>(SucErrData);

  useEffect(() => {
    if (formContext === "Edit" || formContext === "Delete")
      setInitialValues(
        apiData?.data?.find((value: OdcParam) => value.id === idx) ?? NewODCData
      );
    if (formContext === "Add") setInitialValues(NewODCData);
  }, [formContext]);

  useEffect(() => {
    MutationOptions(isError, "isOdcError", setSuccessError);
    MutationOptions(isDeleteSuccess, "isDeleteOdcSuccess", setSuccessError);
    MutationOptions(isDeleteError, "isDeleteOdcError", setSuccessError);
  }, [isError, isDeleteSuccess, isDeleteError]);

  useEffect(() => {
    if (isDeleteSuccess) refetch();
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (successError.isAddOdcSuccess || successError.isUpdateOdcSuccess)
      refetch();
  }, [successError.isAddOdcSuccess, successError.isUpdateOdcSuccess]);

  const delIdx =
    apiData?.data?.findIndex((value: OdcParam) => value.id === idx) ?? 0;

  if (isLoading || countryData?.length <= 0) {
    return <PageLoader />;
  }

  return (
    <>
      <Title title={t(management)} />
      <PageContainer sx={{ background: "#FFFFFF" }}>
        {formContext === "" && (
          <ViewODC
            data={apiData?.data || []}
            setFormContext={setFormContext}
            setIdx={setIdx}
            setSuccessError={setSuccessError}
            country={country}
          />
        )}
        {(formContext === "Add" || formContext === "Edit") && (
          <AddODC
            apiData={apiData?.data || []}
            data={initialValues}
            formContext={formContext}
            setFormContext={setFormContext}
            setSuccessError={setSuccessError}
            country={country}
          />
        )}
      </PageContainer>
      <ConfirmModal
        onConfirm={(): void => {
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
      {(successError.isDeleteOdcSuccess ||
        successError.isDeleteHolidaySuccess) && (
        <Alert
          open={
            successError.isDeleteOdcSuccess ||
            successError.isDeleteHolidaySuccess
          }
          message={t(validationInfo.deleteSuccess)}
          type={"success"}
        />
      )}
      {(successError.isDeleteOdcError || successError.isDeleteHolidayError) && (
        <Alert
          open={
            successError.isDeleteOdcError || successError.isDeleteHolidayError
          }
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
