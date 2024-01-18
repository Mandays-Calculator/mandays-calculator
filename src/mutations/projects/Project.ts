import type { AuthAPIResponse } from '~/api/auth';
import type { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { Project, createProject, deleteProject, updateProject } from '~/api/projects';

export const useCreateProjectMutation = () => {
  return useMutation<AuthAPIResponse, AxiosError, any>(
    (params: any) => createProject(params)
  );
};

export const useUpdateProjectMutation = () => {
  return useMutation<AuthAPIResponse, AxiosError, any>(
    (params: Project) => updateProject(params.projectId, params)
  );
};

export const useDeleteProjectMutation = () => {
  return useMutation<AuthAPIResponse, AxiosError, any>(
    (projectId: string) => deleteProject(projectId)
  );
};