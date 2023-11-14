import type { ReactElement } from "react";
import { Box, Stack } from "@mui/material";
import { Table } from "~/components";
import { useTranslation } from "react-i18next";
import { resourcesDetailData } from "../../utils/tableData";
import { ResourcesListColumns } from "../../utils/columns";
import Accordion from "~/components/Accordion/Accordion";

type ResourcesProps = {
  isGeneratingPDF?: boolean;
};
const Resources = (props: ResourcesProps): ReactElement => {
  const { t } = useTranslation();
  const { isGeneratingPDF } = props;
  return (
    <Box>
      <Stack spacing={2}>
        <Accordion title="I03" defaultExpanded={isGeneratingPDF}>
          <Table
            columns={ResourcesListColumns({ t })}
            data={resourcesDetailData}
            name="mandays-calculator"
          />
        </Accordion>
        <Accordion title="I04" defaultExpanded={isGeneratingPDF}>
          <Table
            columns={ResourcesListColumns({ t })}
            data={resourcesDetailData}
            name="mandays-calculator"
          />
        </Accordion>
        <Accordion title="I05" defaultExpanded={isGeneratingPDF}>
          <Table
            columns={ResourcesListColumns({ t })}
            data={resourcesDetailData}
            name="mandays-calculator"
          />
        </Accordion>
        <Accordion title="I06" defaultExpanded={isGeneratingPDF}>
          <Table
            columns={ResourcesListColumns({ t })}
            data={resourcesDetailData}
            name="mandays-calculator"
          />
        </Accordion>
        <Accordion title="I07" defaultExpanded={isGeneratingPDF}>
          <Table
            columns={ResourcesListColumns({ t })}
            data={resourcesDetailData}
            name="mandays-calculator"
          />
        </Accordion>
      </Stack>
    </Box>
  );
};

export default Resources;
