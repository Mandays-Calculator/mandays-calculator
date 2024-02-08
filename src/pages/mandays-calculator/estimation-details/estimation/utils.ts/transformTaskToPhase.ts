import { CommonOption } from "~/queries/common/options";
import { MandaysForm, Phase, TaskType } from "../../types";

/* 
**
Some type is any as we are forcing to manually update the mismatch 
form values to match add and view details
**
*/

export const transformPhaseValue = (
  formValues: MandaysForm,
  careerSteps: CommonOption,
): Phase[] => {
  const phases: { [key: number]: any } = {};

  formValues.tasks.forEach((task: TaskType) => {
    if (task.dndStatus === "selected") {
      const functionalityId = task.functionality.id;
      const taskId = task.id;
      const complexityId = task.complexity.id;

      const resourceCountByTasks: { [key: string]: number } = {};
      Object.entries(formValues.legends).forEach(
        ([legendId, resourceCountList]) => {
          resourceCountByTasks[legendId] = resourceCountList
            .filter((rc) => rc.careerStep === complexityId)
            .reduce((sum, rc) => sum + rc.manHours, 0);
        },
      );

      if (!phases[0]) {
        phases[0] = { name: "", functionalities: [] };
      }

      phases[0].functionalities.push({
        id: functionalityId,
        name: task.functionality.name,
        estimations: [
          {
            taskId,
            task: task.name,
            complexityId,
            complexity: task.complexity.name,
            resourceCountByTasks: careerSteps.reduce((carreer: any, step) => {
              carreer[step.value.toString()] = 0;
              return carreer;
            }, {}),
          },
        ],
      });
    }
  });

  return Object.values(phases);
};
