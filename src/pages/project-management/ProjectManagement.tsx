import type { ReactElement } from "react";

import Title from "~/components/title/Title";

import AddProject from "./add-project";

const ProjectManagement = (): ReactElement => {
  return (
    <>
      <Title title="Project Management" />
      <AddProject />
    </>
  );
};

export default ProjectManagement;
