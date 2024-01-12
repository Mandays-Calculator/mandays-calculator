import { useState, type ReactElement } from 'react';
import Title from '~/components/title/Title';
import AddProject from './add-project';
import ProjectList from './project-list';
import { Project } from '~/api/projects';

const ProjectManagement = (): ReactElement => {
  const [showAddProject, setShowAddProject] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  const handleAddProject = (): void => {
    setShowAddProject(!showAddProject);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    handleAddProject();
  };

  return (
    <>
      <Title title='Project Management' />
      {showAddProject === false ? (
        <ProjectList handleAddProject={handleAddProject} handleEditProject={handleEditProject} />
      ) : (
        <AddProject selectedProject={selectedProject} handleAddProject={handleAddProject} />
      )}
    </>
  );
};

export default ProjectManagement;
