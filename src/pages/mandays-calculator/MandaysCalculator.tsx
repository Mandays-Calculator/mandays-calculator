import type { ReactElement } from "react";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Typography, Grid } from "@mui/material";

import { SvgIcon, PageContainer, Table } from "~/components";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

import { mandaysCalculatorData } from "./utils/tableData";
import { SprintListColumns } from "./utils/columns";
import { ConfirmModal } from "~/components/modal/confirm-modal";

const MandaysCalculator = (): ReactElement => {
  const { mandaysCalculator } = LocalizationKey;

  const [deleteModalOpen, setDeleteModalOpen] = useState<{
    open: boolean;
    sprintId: string | null;
  }>({
    open: false,
    sprintId: null,
  });

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRowClick = (sprintId: string): void => {
    navigate(`${sprintId}`, {
      state: {
        mode: "view",
      },
    });
  };

  const handleDeleteSprint = (sprintId: string): void => {
    setDeleteModalOpen({
      open: true,
      sprintId: sprintId,
    });
  };

  const handleEditSprint = (sprintId: string): void => {
    navigate(`./${sprintId}`, {
      state: {
        mode: "edit",
      },
    });
  };

  const deleteSelectedSprint = (): void => {
    console.log("deleting sprint");
    setDeleteModalOpen({
      open: false,
      sprintId: null,
    });
  };

  const handleAddSprint = (): void => {
    navigate("./add-sprint", {
      state: {
        mode: "add",
      },
    });
  };

  return (
    <>
      <PageContainer>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography sx={{ fontSize: "1.1rem", mb: "25px" }}>
              {t(mandaysCalculator.sprintListLabel)}
            </Typography>
          </Grid>
          <Grid>
            <CustomButton onClick={handleAddSprint}>
              <SvgIcon name="add_v2" $size={2} sx={{ mr: 1 }} />
              {t(mandaysCalculator.addEstimationBtn)}
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
      <ConfirmModal
        onConfirm={deleteSelectedSprint} // apply delete integration
        open={deleteModalOpen.open}
        message={t(mandaysCalculator.modalConfirmDeleteEstimation)}
        onClose={() =>
          setDeleteModalOpen({
            open: false,
            sprintId: null,
          })
        }
        selectedRow={null}
      />
    </>
  );
};

export default MandaysCalculator;
