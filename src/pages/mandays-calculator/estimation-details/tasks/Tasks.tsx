import type { ReactElement, ReactNode } from "react";

import { useTranslation } from "react-i18next";

import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import LocalizationKey from "~/i18n/key";
import { Accordion, CustomTab, Table } from "~/components";

import { TasksListColumns } from "../../utils/columns";
import { StyledTableContainer } from "../resources/styles";
import { mockData } from "../../utils/tableData";
import { AddTasks } from "./add-tasks";
import { StyledTabs } from "./styles";

interface TaskProps {
  mode: EstimationDetailsMode;
  isGeneratingPDF: boolean;
}

const Tasks = (props: TaskProps): ReactElement => {
  const { mode, isGeneratingPDF } = props;
  const { t } = useTranslation();
  const {
    mandaysCalculator: { summaryTableColumns },
  } = LocalizationKey;

  const tabsData: CustomSteps[] = mockData.phases.map((data) => {
    return {
      label: data.name,
      content: data.functionalities.map((functionalities) => {
        return (
          <Stack mt={1} width={mockData.phases.length <= 2 ? "327%" : "197%"}>
            <Accordion
              key={functionalities.name}
              title={functionalities.name}
              defaultExpanded={isGeneratingPDF}
            >
              <StyledTableContainer>
                <Table
                  columns={TasksListColumns({ t })}
                  data={functionalities.estimations}
                  name="mandays-calculator-tasks"
                />
              </StyledTableContainer>
            </Accordion>
          </Stack>
        );
      }),
    };
  });

  if (mode === "add") {
    return <AddTasks />;
  } else {
    return (
      <>
        <Stack
          width={mockData.phases.length <= 2 ? "30%" : "50%"}
          ml={3}
          mt={2}
        >
          <StyledTabs>
            <CustomTab
              defaultActiveTab={0}
              tabs={
                tabsData as {
                  label: ReactNode;
                  content: ReactNode;
                }[]
              }
            />
          </StyledTabs>
        </Stack>
        <Stack alignItems="end" mt={5} mr={1}>
          <Box width="215px">
            <Stack justifyContent="space-between" flexDirection="row">
              <Typography fontWeight="600" fontSize="0.875rem">
                Grand {t(summaryTableColumns.totalManHours)} :
              </Typography>
              <Typography fontWeight="600" fontSize="0.875rem">
                100 Hours
              </Typography>
            </Stack>
            <Stack justifyContent="space-between" flexDirection="row" mt={0.5}>
              <Typography fontWeight="600" fontSize="0.875rem">
                Grand {t(summaryTableColumns.totalManDays)} :
              </Typography>
              <Typography fontWeight="600" fontSize="0.875rem">
                100 Days
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </>
    );
  }
};

export default Tasks;
