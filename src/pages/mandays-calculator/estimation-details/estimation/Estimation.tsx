import type { ReactElement } from "react";

import { useMemo, useState } from "react";

import Stack from "@mui/material/Stack";

import { Accordion, Select, Table } from "~/components";
import { CustomButton } from "~/components/form/button";
import { Typography, styled } from "@mui/material";
import { EstimationListColumns } from "../../utils/columns";
import { EstimationColumn } from "../../utils/types";
import { useTranslation } from "react-i18next";

interface EstimationProps {
  mode: EstimationDetailsMode;
}

const StyledAccordion = styled(Accordion)(() => ({
  [`& .MuiAccordionSummary-root`]: {
    borderBottom: "1px solid #E1E0E0",
    background: "#D7EFFF",
  },
}));

const StyledFooter = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "column",
}));

const Estimation = (props: EstimationProps): ReactElement => {
  const { mode } = props;
  const [estimation, setEstimation] = useState<string>("");
  console.log(mode);
  const { t } = useTranslation();
  const estimationListColumn = useMemo(() => EstimationListColumns({ t }), []);
  return (
    <Stack
      direction={"column"}
      gap={2}
    >
      <Stack
        justifyContent={"space-between"}
        direction={"row"}
        alignItems={"center"}
      >
        <div>
          <Select
            name="select-estimation"
            options={[{ label: "DEV", value: "dev" }]}
            value={estimation}
            onChange={(val) => setEstimation(val.target.value as string)}
          />
        </div>
        <CustomButton colorVariant="primary">Add Phase</CustomButton>
      </Stack>

      <StyledAccordion title="Function 1">
        <Table<EstimationColumn>
          name="parent-table-estimation"
          data={[
            {
              complexity: "test",
              resourcesNo: "test",
              taskName: "test",
              totalManDays: 10,
              totalManHours: 10,
            },
          ]}
          columns={estimationListColumn}
        />
      </StyledAccordion>
      <Stack
        direction={"row"}
        display={"flex"}
        justifyContent={"flex-end"}
      >
        <StyledFooter>
          <Typography fontWeight={"bold"}>Grand Total Man Hours: 100 Hours</Typography>
          <Typography fontWeight={"bold"}>Grand Total Man Days: 100 Hours</Typography>
        </StyledFooter>
      </Stack>
    </Stack>
  );
};

export default Estimation;
