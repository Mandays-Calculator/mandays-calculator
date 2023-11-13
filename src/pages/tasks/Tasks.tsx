import { type ReactElement } from "react";

import Title from "~/components/title/Title";

import TasksContent from "./tasks-content";

const Tasks = (): ReactElement => {
  return (
    <>
      <Title title="Tasks" />
      <TasksContent />
    </>
  );
};

export default Tasks;
