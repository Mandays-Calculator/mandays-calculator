import { useState, type ReactElement } from "react";

import Title from "~/components/title/Title";

import AddProject from "./add-project";

import ProjectList from "./project-list";

const ProjectManagement = (): ReactElement => {
  const [showAddProject, setShowAddProject] = useState<boolean>(false);

  const handleAddProject: () => void = () => {
    setShowAddProject(!showAddProject);
  };
  return (
    <>
      <Title title="Project Management" />
      {showAddProject === false ? (
        <ProjectList handleAddProject={handleAddProject} />
      ) : (
        <AddProject handleAddProject={handleAddProject} />
      )}
    </>
  );
};

export default ProjectManagement;
