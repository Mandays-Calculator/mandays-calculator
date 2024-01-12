import { useState, type ReactElement } from 'react';
import Title from '~/components/title/Title';
import AddProject from './add-project';
import ProjectList from './project-list';
import { Project } from '~/api/projects';

const ProjectManagement = (): ReactElement => {
  const [showProjectForm, setShowProjectForm] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setShowProjectForm(!showProjectForm);
  };

  return (
    <>
      <Title title='Project Management' />
      {showProjectForm === false ? (
        <ProjectList
          handleAddProject={() => setShowProjectForm(!showProjectForm)}
          handleEditProject={handleEditProject}
        />
      ) : (
        <AddProject
          selectedProject={selectedProject}
          handleAddEditProject={() => setShowProjectForm(!showProjectForm)}
        />
      )}
    </>
  );
};

export default ProjectManagement;
