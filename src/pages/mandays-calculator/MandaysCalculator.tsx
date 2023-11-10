import type { ReactElement } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Typography, Grid } from "@mui/material";

import { SvgIcon, Title, PageContainer, Table } from "~/components";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

import { mandaysCalculatorData } from "./utils/tableData";
import { SprintListColumns } from "./utils/columns";

const MandaysCalculator = (): ReactElement => {
  const { mandaysCalculator } = LocalizationKey;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRowClick = (sprintId: string): void => {
    navigate(`${sprintId}`);
  };

  const handleDeleteSprint = (sprintId: string): void => {
    console.log("Deleting sprintID", sprintId);
  };

  const handleEditSprint = (sprintId: string): void => {
    console.log("Edit sprint", sprintId);
  };

  return (
    <>
      <Title title={t(mandaysCalculator.label)} />
      <PageContainer>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography sx={{ fontSize: "1.1rem", mb: "25px" }}>
              List of Sprints
            </Typography>
          </Grid>
          <Grid>
            <CustomButton>
              <SvgIcon name="add_v2" $size={2} sx={{ mr: 1 }} />
              Add Estimation
            </CustomButton>
          </Grid>
        </Grid>
        <Table
          name="mandays-calculator"
          columns={SprintListColumns({
            t,
            onDeleteSprintDetails: handleDeleteSprint,
            onViewSprintDetails: handleRowClick,
            onEditSprintDetails: handleEditSprint,
          })}
          data={mandaysCalculatorData}
        />
      </PageContainer>
    </>
  );
};

export default MandaysCalculator;
