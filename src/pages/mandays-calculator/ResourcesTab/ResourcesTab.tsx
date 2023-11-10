import type { ReactElement } from "react";
import type { Column } from "react-table";
import { Box, Stack } from "@mui/material";
import { Table } from "~/components";
import { useTranslation } from "react-i18next";
import Accordion from "~/components/Accordion/Accordion";
import LocalizationKey from "~/i18n/key";

const ResourcesTab = (): ReactElement => {
  const { t } = useTranslation();
  const {
    mandaysCalculator: { resourceListTableColumns },
  } = LocalizationKey;

  const data = [
    {
      odc: "PH",
      resourceCount: "5",
      annualLeaves: "3",
    },
    {
      odc: "HK",
      resourceCount: "2",
      annualLeaves: "6",
    },
  ];

  const columns: Column<{
    odc: string;
    resourceCount: string;
    annualLeaves: string;
  }>[] = [
    {
      Header: () => (
        <div style={{ paddingRight: "40px" }}>
          {t(resourceListTableColumns.odc)}
        </div>
      ),
      accessor: "odc",
    },
    {
      Header: () => (
        <div style={{ textAlign: "center" }}>
          {t(resourceListTableColumns.resourceCount)}
        </div>
      ),
      accessor: "resourceCount",
      Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>,
    },
    {
      Header: () => (
        <div style={{ textAlign: "right" }}>
          {t(resourceListTableColumns.annualLeaves)}
        </div>
      ),
      accessor: "annualLeaves",
      Cell: ({ value }) => <div style={{ textAlign: "right" }}>{value}</div>,
    },
  ];

  return (
    <Box>
      <Stack spacing={2}>
        <Accordion title="I03" defaultExpanded={false}>
          <Table columns={columns} data={data} name="mandays-calculator" />
        </Accordion>
        <Accordion title="I04" defaultExpanded={false}>
          <Table columns={columns} data={data} name="mandays-calculator" />
        </Accordion>
        <Accordion title="I05" defaultExpanded={false}>
          <Table columns={columns} data={data} name="mandays-calculator" />
        </Accordion>
        <Accordion title="I06" defaultExpanded={false}>
          <Table columns={columns} data={data} name="mandays-calculator" />
        </Accordion>
        <Accordion title="I07" defaultExpanded={false}>
          <Table columns={columns} data={data} name="mandays-calculator" />
        </Accordion>
      </Stack>
    </Box>
  );
};

export default ResourcesTab;
