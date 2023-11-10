import type { ReactElement } from "react";
import type { Column } from "react-table";
import type { LegendColumn } from "~/pages/mandays-calculator/utils/types";

import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocalizationKey from "~/i18n/key";
import { Table } from "~/components";
import { legendData } from "~/pages/mandays-calculator/utils/tableData";
import { TasksListColumns } from "~/pages/mandays-calculator/utils/columns";

const Legend = (): ReactElement => {
  const { t } = useTranslation();
  const {
    mandaysCalculator
  } = LocalizationKey;

  const legendColumn = TasksListColumns({t}).slice(1, -1) as Column<LegendColumn>[];
  return (
    <Stack spacing={2}> 
      <Typography variant="subtitle1" fontWeight="bold" color="primary">
        {t(mandaysCalculator.legend.tableTitle)}
      </Typography>
      <Table name="legend-table" columns={legendColumn} data={legendData} />
    </Stack>
  )
}

export default Legend; 