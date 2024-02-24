import { type ReactElement } from "react";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Stack, Grid } from "@mui/material";
import _ from "lodash";

import { useGetEstimationHistory } from "~/queries/mandays-est-tool/mandaysEstimationTool";
import { useUserAuth } from "~/hooks/user";

import LocalizationKey from "~/i18n/key";
import {
  Alert,
  PageContainer,
  PageLoader,
  Table,
  TextField,
} from "~/components";
import { filterDataByValue } from "~/utils/helpers";
import { HistoryColumns } from "./utils/column";

const Tasks = (): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { history, common } = LocalizationKey;
  const user = useUserAuth();

  // get estimations based on project
  const {
    data,
    isLoading: isLoadingHistory,
    isError: isErrorLoadingHistory,
  } = useGetEstimationHistory({
    projectId: user.state.selectedProject?.value || "",
    userId: user.state.user?.id || "",
  });

  const historyData = data?.data || [];

  const [filterValue, setFilterValue] = useState<string>("");

  const handleViewSprintDetails = (sprintName: string): void => {
    navigate(`../mandays-estimation-tool/${sprintName}`);
  };

  const filteredHistory = filterDataByValue(historyData, filterValue, [
    "name",
    "team",
    "startDate",
    "endDate",
  ]);

  if (isLoadingHistory) {
    return <PageLoader labelOnLoad={history.loadingHistory} />;
  }
  return (
    <>
      <PageContainer>
        <Stack>
          <Grid container>
            <Grid item xs={5} mb={2}>
              <TextField
                disabled={historyData.length === 0}
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
                noDataLabel={t(history.noEstimation)}
                data={filteredHistory}
              />
            </Grid>
          </Grid>
        </Stack>
      </PageContainer>
      {isErrorLoadingHistory && (
        <Alert
          type="error"
          message={t(common.errorMessage.genericError)}
          open={true}
          duration={3000}
        />
      )}
    </>
  );
};

export default Tasks;
