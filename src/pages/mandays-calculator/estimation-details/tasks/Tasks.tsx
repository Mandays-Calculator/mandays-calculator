import type { ReactElement } from "react";
import type { EstimationDetailsMode } from "../";
import { useTranslation } from "react-i18next";

import { Table } from "~/components";
import { taskDetailData } from "../../utils/tableData";
import { TasksListColumns } from "../../utils/columns";

interface TaskProps {
  mode: EstimationDetailsMode;
}

const Tasks = (props: TaskProps): ReactElement => {
  const { mode } = props;
  const { t } = useTranslation();
  if (mode === "add") {
    return <h1>Add item</h1>;
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
