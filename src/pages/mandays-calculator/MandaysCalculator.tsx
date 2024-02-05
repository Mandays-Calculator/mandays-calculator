import type { ReactElement } from "react";
import type { TFunction } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

import { SvgIcon, PageContainer, Table, PageLoader, Alert } from "~/components";
import { CustomButton } from "~/components/form/button";
import { ConfirmModal } from "~/components/modal/confirm-modal";

import { useTimeout } from "~/hooks/timeout";
import { useUserAuth } from "~/hooks/user";
import { useRequestHandler } from "~/hooks/request-handler";

import { useDeleteEstimation } from "~/mutations/mandays-est-tool";
import { useGetEstimations } from "~/queries/mandays-est-tool/MandaysEstimationTool";
import LocalizationKey from "~/i18n/key";

import { SprintListColumns } from "./utils/columns";
import { StyledSprintLabel } from "./styles";

interface AlertRendererProps {
  isErrorLoadingEstimations: boolean;
  successMessage: string;
  t: TFunction;
}

const AlertRenderer = ({
  isErrorLoadingEstimations,
  t,
  successMessage,
}: AlertRendererProps): ReactElement => {
  const { common } = LocalizationKey;
  return (
    <>
      {isErrorLoadingEstimations && (
        <Alert
          type="error"
          message={t(common.errorMessage.genericError)}
          open={isErrorLoadingEstimations}
        />
      )}
      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          open={successMessage !== ""}
        />
      )}
    </>
  );
};

const MandaysCalculator = (): ReactElement => {
  const { mandaysCalculator } = LocalizationKey;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [triggerTimeout] = useTimeout();

  const user = useUserAuth();
  const deleteSprintMutation = useDeleteEstimation();
  // get estimations based on project
  const {
    data: estimationData,
    isLoading: isLoadingEstimations,
    isError: isErrorLoadingEstimations,
    refetch: refetchEstimations,
  } = useGetEstimations({
    projectId: user.state.selectedProject?.value || "",
    userId: user.state.user?.id || "",
  });

  const [deleteStatus, callDeleteSprintAPI] = useRequestHandler(
    deleteSprintMutation.mutate,
    () => {
      // success callback
      setSuccessMessage("Estimation deleted successfully.");
      refetchEstimations();
      triggerTimeout(() => setSuccessMessage(""));
    },
  );

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState<{
    open: boolean;
    estimationId: string | null;
  }>({
    open: false,
    estimationId: null,
  });

  const handleNavigate = (mode: string, estimationId: string): void => {
    if (mode === "add") {
      navigate("./add-sprint", {
        state: {
          mode: mode,
        },
      });
    } else {
      navigate(`${estimationId}`, {
        state: {
          mode: mode,
        },
      });
    }
  };

  const handleDeleteSprint = (estimationId: string): void => {
    setDeleteModalOpen({
      open: true,
      estimationId: estimationId,
    });
  };

  const deleteSelectedSprint = (): void => {
    if (deleteModalOpen.estimationId) {
      callDeleteSprintAPI(deleteModalOpen.estimationId);
    }
    setDeleteModalOpen({
      open: false,
      estimationId: null,
    });
  };

  if (isLoadingEstimations || deleteStatus.loading) {
    return <PageLoader labelOnLoad={t(mandaysCalculator.sprintListLoader)} />;
  }
  return (
    <>
      <PageContainer>
        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
          <Grid item>
            <StyledSprintLabel>
              {t(mandaysCalculator.sprintListLabel)}
            </StyledSprintLabel>
          </Grid>
          <Grid>
            <CustomButton onClick={() => handleNavigate("add", "")}>
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
            onViewSprintDetails: (estimationId: string) =>
              handleNavigate("view", estimationId),
            onEditSprintDetails: (estimationId: string) =>
              handleNavigate("edit", estimationId),
          })}
          loading={isLoadingEstimations}
          data={estimationData ? estimationData.data : []}
        />
      </PageContainer>
      <ConfirmModal
        onConfirm={deleteSelectedSprint}
        open={deleteModalOpen.open}
        maxWidth="lg"
        message={t(mandaysCalculator.modalConfirmDeleteEstimation)}
        onClose={() =>
          setDeleteModalOpen({
            open: false,
            estimationId: null,
          })
        }
        selectedRow={null}
      />
      <AlertRenderer
        isErrorLoadingEstimations={
          isErrorLoadingEstimations || deleteStatus.error.message !== ""
        }
        successMessage={successMessage}
        t={t}
      />
    </>
  );
};

export default MandaysCalculator;
