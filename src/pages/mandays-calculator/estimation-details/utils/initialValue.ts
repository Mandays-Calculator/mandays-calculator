import { CommonOption } from "~/queries/common/options";
import { MandaysForm, Resource, Phase, TaskType } from "..";

export const initMandays: MandaysForm = {
  summary: {
    estimationName: "",
    teamId: "",
    utilizationRate: "",
    startDate: "",
    endDate: "",
  },
  resources: {},
  legends: {},
  tasks: [],
  phases: [],
};

const constructTasks = (data: TaskType[]): TaskType[] => {
  return (
    data?.map((task) => {
      return {
        ...task,
        dndStatus: "unselected",
      };
    }) || []
  );
};

export const initializeTasksListData = (
  tasksData: TaskType[],
  taskValues: TaskType[],
): TaskType[] | undefined => {
  if (tasksData && taskValues.length <= 0) {
    const toBeTasks = constructTasks(tasksData);
    return toBeTasks;
  }
};

export const initializeResources = (careerLevels: CommonOption): Resource => {
  const titles = careerLevels.map((cl) => cl.value);
  return titles.reduce((acc: any, careerLevel) => {
    acc[careerLevel] = [];
    return acc;
  }, {});
};

/* 
**
Some type is any as we are forcing to manually update the mismatch 
form values to match add and view details
**
*/
export const initializeformPhaseValue = (
  formValues: MandaysForm,
  careerSteps: SelectObject[],
): Phase[] => {
  const phase: any = { name: "", functionalities: [] };

  formValues.tasks.forEach((task: TaskType) => {
    if (task.dndStatus === "selected") {
      const functionalityId = task.functionality.id;
      const taskId = task.id;
      const complexityId = task.complexity.id;

      const resourceCountByTasks: { [key: string]: number } = {};
      Object.entries(formValues.legends).forEach(
        ([legendId, resourceCountList]) => {
          resourceCountByTasks[legendId] = resourceCountList
            .filter((rc) => rc.careerStep === task.complexity.name)
            .reduce((sum, rc) => sum + rc.manHours, 0);
        },
      );

      let functionality = phase.functionalities.find(
        (f: any) => f.id === functionalityId,
      );
      if (!functionality) {
        functionality = {
          id: functionalityId,
          name: task.functionality.name,
          estimations: [],
        };
        phase.functionalities.push(functionality);
      }

      functionality.estimations.push({
        taskId,
        task: task.name,
        complexityId,
        complexity: task.complexity.name,
        resourceCountByTasks: careerSteps.reduce((career: any, step) => {
          career[step.value.toString()] =
            resourceCountByTasks[step.value.toString()] || 0;
          return career;
        }, {}),
      });
    }
  });

  return [phase];
};
