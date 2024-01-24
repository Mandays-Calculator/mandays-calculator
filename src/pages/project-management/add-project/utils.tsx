import type { Project } from '~/api/projects';
import type { AddTeamForm } from './types';

export const addFormInitValue: AddTeamForm = {
  projectName: '',
  teams: [],
};

export const SetProjectForm = (selectedProject: Project) => {
  return {
    projectName: selectedProject.name,
    teams: selectedProject.teams.map(({ name, teamMembers, teamLead, ...team }) => ({
      ...team,
      teamMembers: (teamMembers ?? []).map((member) => {
        const memberName =
          member.firstName && member.lastName
            ? `${member.firstName}, ${member.lastName} ${member.middleName ?? ''}`
            : '-';

        return { ...member, name: memberName };
      }),
      teamLead: {
        value: teamLead.id,
        label: `${teamLead.firstName}, ${teamLead.lastName} ${teamLead.middleName ?? ''}`,
      },
      teamName: name ?? '-',
    })),
  };
};
