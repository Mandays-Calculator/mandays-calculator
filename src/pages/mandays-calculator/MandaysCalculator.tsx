import type { ReactElement } from "react";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Typography, Grid } from "@mui/material";

import { SvgIcon, PageContainer, Table, PageLoader, Alert } from "~/components";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

import { mandaysCalculatorData } from "./utils/tableData";
import { SprintListColumns } from "./utils/columns";
import { ConfirmModal } from "~/components/modal/confirm-modal";
import { useGetEstimations } from "~/queries/mandays-est-tool/mandaysEstimationTool";
import { useUserAuth } from "~/hooks/user";

const MandaysCalculator = (): ReactElement => {
  const { mandaysCalculator, common } = LocalizationKey;
  const user = useUserAuth();

  const {
    data: estimationData,
    isLoading: isLoadingEstimations,
    isError: isErrorLoadingEstimations,
  } = useGetEstimations({
    projectId: "69e85049-bbf2-11ee-a0aa-00090faa0001",
    userId: user.state.user?.id || "",
  });

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

  if (isLoadingEstimations) {
    return <PageLoader labelOnLoad="loading estimations ..." />;
  }
  return (
    <>
      <PageContainer>
        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
          <Grid item>
            <Typography
              sx={{ fontSize: "1.1rem", mb: "25px", fontWeight: "500" }}
            >
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
          data={isErrorLoadingEstimations ? [] : estimationData}
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
      {isErrorLoadingEstimations && (
        <Alert
          type="error"
          message={t(common.errorMessage.genericError)}
          open={isErrorLoadingEstimations}
        />
      )}
    </>
  );
};

export default MandaysCalculator;
