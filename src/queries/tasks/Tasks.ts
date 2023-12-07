import type { allTasksResponse } from "~/api/tasks";
import { useQuery } from "react-query";

import { getTasks } from "~/api/tasks/Tasks";

export const useTasksList = () => {
  return useQuery<allTasksResponse[], Error>("odcList", getTasks);
};
