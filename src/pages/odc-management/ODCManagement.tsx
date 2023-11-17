import type { ReactElement } from "react";
import type { IntValues } from "./utils/interface";

import { useEffect, useState } from "react";

import { useFormik } from "formik";

import Title from "~/components/title/Title";
import { DeleteModal } from "~/components/modal/delete-modal";
import { Form } from "~/components/form";

import AddODC from "./add-list/AddODC";
import ViewODC from "./view-list/ViewODC";
import { IntValuesSchema } from "./utils/schema";
import { useODCList } from "~/queries/odc/ODC";
import { PageLoader } from "~/components";

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
  const [odc, setODC] = useState(ODCForm.initialValues.odcList);

  useEffect(() => {
    setODC(ODCForm.values.odcList);
  }, [ODCForm.values.odcList]);

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
              data={odc}
              setDelIdx={setDelIdx}
            />
          )}
        </Form>
        {JSON.stringify(data)}
        <DeleteModal
          onDeleteConfirm={(): void => {
            const dIdx = delIdx || 0;
            const arr = ODCForm.values.odcList;
            arr.splice(dIdx, 1);
            ODCForm.setFieldValue(`odcList`, arr);
            setDeleteModalOpen(false);
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
