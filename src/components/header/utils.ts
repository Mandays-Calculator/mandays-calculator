import { UserProject } from "~/api/auth";

export const getProjectOptions = (projects: UserProject[]): SelectObject[] => {
  return projects
    .filter((project: UserProject) => project.active)
    .map((project) => ({
      label: project.name,
      value: project.projectId,
    }));
};
