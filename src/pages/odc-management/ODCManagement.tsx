import type { ReactElement } from "react";
import type { OdcParam } from "~/api/odc";
import type { FormContext } from "./utils";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useODCList } from "~/queries/odc/ODC";
import { PageLoader, Title, PageContainer, ConfirmModal, Alert } from "~/components";
import LocalizationKey from "~/i18n/key";

import AddODC from "./add-list/AddODC";
import ViewODC from "./view-list/ViewODC";
import { NewODCData } from "./utils";

const ODCManagement = (): ReactElement => {
  const { t } = useTranslation();
  const {
    odc: { management },
    common: { errorMessage: { genericError } }
  } = LocalizationKey;
  
  const { data: apiData, isLoading, isError } = useODCList();

  const [initialValues, setInitialValues] = useState<OdcParam>(NewODCData);
  const [formContext, setFormContext] = useState<FormContext>("");
  const [idx, setIdx] = useState<string>("");

  useEffect(() => {
    if (formContext === "Edit" || formContext === "Delete")
      setInitialValues(apiData?.find((value: OdcParam) => value.id === idx) ?? NewODCData);
    if (formContext === "Add")
      setInitialValues(NewODCData);
  }, [formContext]);

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
          />
        )}
      </PageContainer>
      <ConfirmModal
        onConfirmWithIndex={(): void => {
          setFormContext("");
        }}
        open={formContext === "Delete"}
        onClose={() => setFormContext("")}
        selectedRow={delIdx}
      />
      {isError && (
        <Alert
          open={isError}
          message={t(genericError)}
          type={"error"}
        />
      )}
    </>
  );
};

export default ODCManagement;
