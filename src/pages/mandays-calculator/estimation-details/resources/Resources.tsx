import type { ReactElement } from "react";
import type { EstimationDetailsMode } from "../";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Stack } from "@mui/material";
import { resourcesDetailData } from "../../utils/tableData";
import { ResourcesListColumns } from "../../utils/columns";
import { Form, Table } from "~/components";
import { CustomButton } from "~/components/form/button";
import Accordion from "~/components/Accordion/Accordion";

interface ResourcesProps {
  mode: EstimationDetailsMode;
  isGeneratingPDF: boolean;
}

const Resources = (props: ResourcesProps): ReactElement => {
  const { mode, isGeneratingPDF } = props;
  const { t } = useTranslation();

  const resourcesForm = useFormik({
    initialValues: {
      resValues: [...resourcesDetailData],
    },
    onSubmit: (values) =>
      console.log("Submit API will be called here", values.resValues),
    enableReinitialize: true,
  });

  const titles = ["I03", "I04", "I05", "I06", "I07"];
  const inputView = ["add", "edit"];
  const isInput: boolean = inputView.includes(mode);
  const columnsMemo = useMemo(() => ResourcesListColumns({ t, isInput }), []);

  const renderTable = (title: string) => (
    <Accordion key={title} title={title} defaultExpanded={isGeneratingPDF}>
      <Table
        columns={columnsMemo}
        data={resourcesDetailData}
        name="mandays-calculator"
      />
    </Accordion>
  );

  return (
    <Form instance={resourcesForm}>
      <Stack spacing={2}>
        {titles.map((title) => renderTable(title))}
        {isInput && (
          <Stack display="flex" justifyContent="flex-end" flexDirection="row">
            <CustomButton type="submit">Submit</CustomButton>
          </Stack>
        )}
      </Stack>
    </Form>
  );
};

export default Resources;
