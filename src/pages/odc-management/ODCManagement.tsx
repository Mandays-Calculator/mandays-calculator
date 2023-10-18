import type { ReactElement } from "react";
import Title from "~/components/title/Title";
import ViewODC from "./view-list/ViewODC";

const ODCManagement = (): ReactElement => {
  return (
    <>
      <Title title="ODC Management" />
      <ViewODC />
    </>
  );
};

export default ODCManagement;
