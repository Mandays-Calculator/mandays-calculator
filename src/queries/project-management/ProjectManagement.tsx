import { useQuery } from 'react-query';

import { Project, getProjects } from '~/api/projects';

export const useProjectList = () => {
  return useQuery<Project, Error>('projectList', getProjects);
};
