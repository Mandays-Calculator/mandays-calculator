import type { UserProject } from "~/api/auth";
import uniqBy from "lodash/uniqBy";

export const getProjectOptions = (projects: UserProject[]): SelectObject[] => {
  const uniqueProjects = uniqBy(projects, "projectId");

  return uniqueProjects
    .filter((project: UserProject) => project.active)
    .map((project) => ({
      label: project.name,
      value: project.projectId,
    }));
};
