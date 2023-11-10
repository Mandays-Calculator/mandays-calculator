import type { ReactElement } from "react";
import type { Column } from "react-table";
import type { LegendColumn } from "~/pages/mandays-calculator/utils/types";

import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocalizationKey from "~/i18n/key";
import { Table } from "~/components";
import { legendData } from "~/pages/mandays-calculator/utils/tableData";


const Legend = (): ReactElement => {
  const { t } = useTranslation();
  const {
    common,
    mandaysCalculator
  } = LocalizationKey;
  
  const legendColumn: Column<LegendColumn>[] = [
    {
      Header: () => <>{t(common.complexity)}</>,
      accessor: "complexity",
    },
    {
      Header: "I03",
      accessor: "step3",
    },
    {
      Header: "I04",
      accessor: "step4",
    },
    {
      Header: "I05",
      accessor: "step5",
    },
    {
      Header: "I06",
      accessor: "step6",
    },
    {
      Header: "I07",
      accessor: "step7",
    },
  ]

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