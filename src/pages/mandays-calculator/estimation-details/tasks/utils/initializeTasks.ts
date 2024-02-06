import { TaskType } from "../../types";

const constructData = (data: TaskType[]): TaskType[] => {
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
) => {
  if (tasksData && taskValues.length <= 0) {
    const toBeTasks = constructData(tasksData);
    return toBeTasks;
  }
};
