import type { ReactElement } from "react";
import { Box, Stack } from "@mui/material";
import { Table } from "~/components";
import { useTranslation } from "react-i18next";
import { resourcesDetailData } from "../../utils/tableData";
import { ResourcesListColumns } from "../../utils/columns";
import Accordion from "~/components/Accordion/Accordion";

const Resources = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <Box>
      <Stack spacing={2}>
        <Accordion title="I03" defaultExpanded={false}>
          <Table
            columns={ResourcesListColumns({ t })}
            data={resourcesDetailData}
            name="mandays-calculator"
          />
        </Accordion>
        <Accordion title="I04" defaultExpanded={false}>
          <Table
            columns={ResourcesListColumns({ t })}
            data={resourcesDetailData}
            name="mandays-calculator"
          />
        </Accordion>
        <Accordion title="I05" defaultExpanded={false}>
          <Table
            columns={ResourcesListColumns({ t })}
            data={resourcesDetailData}
            name="mandays-calculator"
          />
        </Accordion>
        <Accordion title="I06" defaultExpanded={false}>
          <Table
            columns={ResourcesListColumns({ t })}
            data={resourcesDetailData}
            name="mandays-calculator"
          />
        </Accordion>
        <Accordion title="I07" defaultExpanded={false}>
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
