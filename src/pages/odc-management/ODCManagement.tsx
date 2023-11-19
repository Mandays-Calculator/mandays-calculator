import type { ReactElement } from "react";
import type { IntValues } from "./utils/interface";

import { useState, useEffect } from "react";

import { useFormik } from "formik";

import { useODCList } from "~/queries/odc/ODC";
import { PageLoader, Title, Form } from "~/components";
import { DeleteModal } from "~/components/modal/delete-modal";

import AddODC from "./add-list/AddODC";
import ViewODC from "./view-list/ViewODC";
import { IntValuesSchema } from "./utils/schema";
import { NewODCData } from "./utils/data";

const ODCManagement = (): ReactElement => {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>(0);
  const [delIdx, setDelIdx] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { data, isLoading } = useODCList();
  const InitialValue = { odcList: data || [] };

  const ODCForm = useFormik<IntValues>({
    initialValues: InitialValue,
    validationSchema: IntValuesSchema,
    enableReinitialize: true,
    onSubmit: (): void => {},
  });
  
  useEffect(() => {
    if (isAdd === true && isEdit === false) {
      const arr = ODCForm.values.odcList;
      arr.push(NewODCData);
      setIdx(arr.length - 1);
      ODCForm.setFieldValue(`ocdList`, arr);
    }
  }, [isAdd]);

  if (isLoading) {
    return <PageLoader />;
  } else {
    return (
      <>
        <Title title="ODC Management" />
        <Form instance={ODCForm}>
          {isAdd ? (
            <AddODC setIsAdd={setIsAdd} isEdit={isEdit} idx={idx} />
          ) : (
            <ViewODC
              setIsAdd={setIsAdd}
              setDeleteModalOpen={setDeleteModalOpen}
              setIsEdit={setIsEdit}
              setIdx={setIdx}
              setDelIdx={setDelIdx}
            />
          )}
        </Form>
        {JSON.stringify(data)}
        <DeleteModal
          onDeleteConfirm={(): void => {
            const dIdx = delIdx || 0;
            const arr = ODCForm.values.odcList;
            // arr.splice(dIdx, 1);
            setDeleteModalOpen(false);
            // postUpdateAPI
            arr[dIdx].active = false;
            ODCForm.setFieldValue(`odcList`, arr);
            console.log('Delete API', arr, dIdx);
          }}
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          selectedRow={delIdx}
        />
      </>
    );
  }
};

export default ODCManagement;
