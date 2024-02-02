import type { ReactElement } from "react";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";
import { resourcesDetailData } from "../../utils/tableData";
import { ResourcesListColumns } from "../../utils/columns";
import { Accordion, Table } from "~/components";
import { StyledTableContainer } from "./styles";
import AddOdcButton from "../components/add-odc-button/AddOdcButton";

interface ResourcesProps {
  mode: EstimationDetailsMode;
  isGeneratingPDF: boolean;
}

const Resources = (props: ResourcesProps): ReactElement => {
  const { mode, isGeneratingPDF } = props;
  const { t } = useTranslation();

  const titles = ["I03", "I04", "I05", "I06", "I07"];
  const inputView = ["add", "edit"];
  const isInput: boolean = inputView.includes(mode);
  const columnsMemo = useMemo(() => ResourcesListColumns({ t, isInput }), []);

  const renderTable = (title: string) => (
    <Accordion key={title} title={title} defaultExpanded={isGeneratingPDF}>
      <StyledTableContainer>
        <Table
          columns={columnsMemo}
          data={resourcesDetailData}
          name="mandays-calculator"
        />
        <AddOdcButton onClick={() => console.log("add odc")} />
      </StyledTableContainer>
    </Accordion>
  );

  return <Stack spacing={2}>{titles.map((title) => renderTable(title))}</Stack>;
};

export default Resources;
