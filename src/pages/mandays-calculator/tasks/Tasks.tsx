import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { Table } from "~/components";
import { taskDetailData } from "../utils/tableData";
import { TasksListColumns } from "../utils/columns";

const Tasks = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <>
      <Table
        columns={TasksListColumns({ t })}
        data={taskDetailData}
        type="collapse"
        name="mandays-calculator-tasks"
        expandedData={true}
        onRowClick={(data) => console.log("data", data)}
      />
    </>
  );
};

export default Tasks;
