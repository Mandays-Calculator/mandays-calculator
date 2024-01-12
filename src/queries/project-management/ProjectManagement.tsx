import { useQuery } from 'react-query';

import { ProjectListResponse, getProjects } from '~/api/projects';

export const useProjectList = () => {
  return useQuery<ProjectListResponse, Error>('projectList', getProjects);
};
