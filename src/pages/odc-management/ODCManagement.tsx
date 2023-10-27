import type { ReactElement } from "react";
import type { IntValues } from "./utils/interface";

import { useEffect, useState } from "react";

import { useFormik } from "formik";

import Title from "~/components/title/Title";
import { DeleteModal } from "~/components/modal/delete-modal";
import { Form } from "~/components/form";

import AddODC from "./add-list/AddODC";
import ViewODC from "./view-list/ViewODC";
import { InitialODCValues } from "./utils/data";

const ODCManagement = (): ReactElement => {
  const [isAddODC, setIsAddODC] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>(0);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const ODCForm = useFormik<IntValues>({
    initialValues: InitialODCValues,
    enableReinitialize: true,
    onSubmit: (): void => {},
  });

  const [rows, setRows] = useState(ODCForm.initialValues.odcList);

  useEffect(() => {
    setRows(ODCForm.values.odcList);
  }, [ODCForm.values.odcList]);

  const handleDeleteRow = (rowIndex: number) => {
    setSelectedRow(rowIndex);
  };

  return (
    <>
      <Title title="ODC Management" />

      <Form instance={ODCForm}>
        {isAddODC ? (
          <AddODC setAddODC={setIsAddODC} isEdit={isEdit} idx={idx} />
        ) : (
          <ViewODC
            setAddODC={setIsAddODC}
            setDeleteModalOpen={setDeleteModalOpen}
            setIsEdit={setIsEdit}
            setIdx={setIdx}
            data={rows}
            onDeleteRow={handleDeleteRow}
          />
        )}
      </Form>

      <DeleteModal
        onDeleteConfirm={(rowIndex) => {
          if (rowIndex !== -1) {
            const updatedRows = rows.filter((_, index) => index !== rowIndex);
            setRows(updatedRows);
          }
          setSelectedRow(null);
          setDeleteModalOpen(false);
        }}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default ODCManagement;
