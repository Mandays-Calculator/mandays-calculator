import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { Table } from "~/components";
import { taskDetailData } from "../../utils/tableData";
import { TasksListColumns } from "../../utils/columns";
import { AddTasks } from "./add-tasks";

interface TaskProps {
  mode: EstimationDetailsMode;
}

const Tasks = (props: TaskProps): ReactElement => {
  const { mode } = props;
  const { t } = useTranslation();
  if (mode === "add") {
    return <AddTasks />;
  } else {
    return (
      <>
        <Table
          columns={TasksListColumns({ t })}
          data={taskDetailData}
          type="collapse"
          name="mandays-calculator-tasks"
          expandedData={true}
        />
      </>
    );
  }
};

export default Tasks;
