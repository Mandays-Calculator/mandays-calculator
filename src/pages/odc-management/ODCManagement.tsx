import type { ReactElement } from "react";
import type { IntValues } from "./utils/interface";

import { useState, useEffect } from "react";

import { useFormik } from "formik";

import Title from "~/components/title/Title";
import { DeleteModal } from "~/components/modal/delete-modal";
import { Form } from "~/components/form";

import AddODC from "./add-list/AddODC";
import ViewODC from "./view-list/ViewODC";
import { InitialODCValues, NewODCData } from "./utils/data";

const ODCManagement = (): ReactElement => {
  const [isAddODC, setIsAddODC] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>(0);

  const ODCForm = useFormik<IntValues>({
    initialValues: InitialODCValues,
    enableReinitialize: true,
    onSubmit: (): void => {},
  });

  useEffect(() => {
    if (isAddODC === true && isEdit === false) {
      const arr = InitialODCValues.odcList;
      arr.push(NewODCData);
      setIdx(arr.length - 1);
      ODCForm.setFieldValue(`odcList`, arr);
    }
  }, [isAddODC]);

  return (
    <>
      <Title title="ODC Management" />

      <Form instance={ODCForm}>
        {isAddODC ? (
          <AddODC
            setAddODC={setIsAddODC}
            isEdit={isEdit}
            idx={idx}
          />
        ) : (
          <ViewODC
            setAddODC={setIsAddODC}
            setDeleteModalOpen={setDeleteModalOpen}
            setIsEdit={setIsEdit}
            setIdx={setIdx}
          />
        )}
      </Form>
      
      <DeleteModal
        onDeleteConfirm={() => setDeleteModalOpen(true)}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />
    </>
  );
};

export default ODCManagement;
