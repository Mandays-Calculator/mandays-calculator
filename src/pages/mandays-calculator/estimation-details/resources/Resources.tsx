import type { ReactElement } from "react";
import type { EstimationDetailsMode } from "../";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { resourcesDetailData } from "../../utils/tableData";
import { ResourcesListColumns } from "../../utils/columns";
import { Form, Table } from "~/components";
import { CustomButton } from "~/components/form/button";
import Accordion from "~/components/Accordion/Accordion";

interface ResourcesProps {
  mode: EstimationDetailsMode;
}

const Resources = (props: ResourcesProps): ReactElement => {
  const { mode } = props;
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

  const renderTable = (title: string) => (
    <Accordion key={title} title={title} defaultExpanded={false}>
      <Table
        columns={ResourcesListColumns({ t, isInput })}
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
