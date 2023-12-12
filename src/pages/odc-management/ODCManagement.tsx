import type { ReactElement } from "react";
import type { ODCListResponse } from "~/api/odc";
import type { FormContext } from "./utils";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useODCList } from "~/queries/odc/ODC";
import { PageLoader, Title, PageContainer, ConfirmModal } from "~/components";
import LocalizationKey from "~/i18n/key";

import AddODC from "./add-list/AddODC";
import ViewODC from "./view-list/ViewODC";
import { NewODCData } from "./utils";

const ODCManagement = (): ReactElement => {
  const { t } = useTranslation();
  const { odc: { management } } = LocalizationKey;
  
  const { data, isLoading } = useODCList();

  const [initialValues, setInitialValues] = useState<ODCListResponse>(NewODCData);
  const [formContext, setFormContext] = useState<FormContext>('');
  const [idx, setIdx] = useState<number>(0);

  useEffect(() => {
    const APIData = data || [];
    if (formContext === "Edit" || formContext === "Delete")
      setInitialValues(APIData[idx]);
    if (formContext === "Add")
      setInitialValues(NewODCData);
  }, [formContext]);

  if (isLoading) { return <PageLoader /> };

  return (
    <>
      <Title title={t(management)} />
      <PageContainer sx={{ background: "#FFFFFF" }}>
        {formContext === "" && (
          <ViewODC
            data={data || []}
            setFormContext={setFormContext}
            setIdx={setIdx}
          />
        )}
        {(formContext === "Add" || formContext === "Edit") && (
          <AddODC
            apiData={data || []}
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
        selectedRow={idx}
      /> 
    </>
  );
};

export default ODCManagement;
