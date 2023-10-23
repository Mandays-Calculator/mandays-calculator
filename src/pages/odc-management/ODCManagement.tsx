import type { ReactElement } from "react";

import { useState } from "react";

import Title from "~/components/title/Title";
import { DeleteModal } from "~/components/modal/delete-modal";

import AddODC from "./add-list/AddODC";
import ViewODC from "./view-list/ViewODC";

const ODCManagement = (): ReactElement => {
  const [addODC, setAddODC] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  return (
    <>
      <Title title="ODC Management" />

      {addODC ? (
        <AddODC setAddODC={setAddODC} isEdit={true} />
      ) : (
        <ViewODC
          setAddODC={setAddODC}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      )}
      
      <DeleteModal
        onDeleteConfirm={() => setDeleteModalOpen(true)}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />
    </>
  );
};

export default ODCManagement;
