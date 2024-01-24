import { useState, type ReactElement } from 'react';
import Title from '~/components/title/Title';
import { Project } from '~/api/projects';
import AddProject from './add-project';
import ProjectList from './project-list';
import ViewProject from './view-project';

const ProjectManagement = (): ReactElement => {
  const [showProjectForm, setShowProjectForm] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [readonlyProject, setReadonlyProject] = useState<boolean>(false);

  const handleAddProject = () => {
    setSelectedProject(null);
    setShowProjectForm(!showProjectForm);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setShowProjectForm(!showProjectForm);
  };

  const handleViewProject = (project: Project) => {
    setReadonlyProject(true);
    setSelectedProject(project);
  };

  return (
    <>
      <Title title='Project Management' />

      {readonlyProject ? (
        <ViewProject selectedProject={selectedProject} handleBackBtn={() => setReadonlyProject(false)} />
      ) : showProjectForm === false ? (
        <ProjectList
          handleAddProject={handleAddProject}
          handleEditProject={handleEditProject}
          handleViewProject={handleViewProject}
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
