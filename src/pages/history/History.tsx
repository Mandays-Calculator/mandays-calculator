import { type ReactElement } from "react";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Stack, Grid } from "@mui/material";
import _ from "lodash";

import LocalizationKey from "~/i18n/key";
import { PageContainer, Table, TextField } from "~/components";
import { filterDataByValue } from "~/utils/helpers";

import { HistoryColumns } from "./utils/column";
import { historyData } from "./utils/tableData";

const Tasks = (): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { history } = LocalizationKey;

  const [filterValue, setFilterValue] = useState<string>("");

  const handleViewSprintDetails = (sprintName: string): void => {
    navigate(`../mandays-estimation-tool/${sprintName}`);
  };

  const filteredHistory = filterDataByValue(historyData, filterValue, [
    "sprintName",
    "team",
    "startDate",
    "endDate",
  ]);

  return (
    <PageContainer>
      <Stack>
        <Grid container>
          <Grid item xs={5} mb={2}>
            <TextField
              placeholder={t(history.filterPlacholder)}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              name="filter-history"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Table
              name="history-table"
              columns={HistoryColumns({
                t: t,
                onViewSprintDetails: handleViewSprintDetails,
              })}
              data={filteredHistory}
            />
          </Grid>
        </Grid>
      </Stack>
    </PageContainer>
  );
};

export default Tasks;
