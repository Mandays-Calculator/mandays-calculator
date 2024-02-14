import { useEffect, type ReactElement, useState } from "react";
import type { Location } from "react-router-dom";
import type { ReviewSummaryType } from "..";

import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Alert, ConfirmModal, PageContainer, Title } from "~/components";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";

import { useRequestHandler } from "~/hooks/request-handler";
import { useCreateEstimation } from "~/mutations/mandays-est-tool";
import { useUserAuth } from "~/hooks/user";
import { useTimeout } from "~/hooks/timeout";

import SummaryContent from "../summary/summary-content";
import { createSubmitValue } from "../../utils/createSubmitValue";

const ReviewSummary = (): ReactElement => {
  const { mandaysCalculator, common } = LocalizationKey;
  const { state }: Location<ReviewSummaryType> = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [timeout] = useTimeout();
  const estimationMutation = useCreateEstimation();

  const user = useUserAuth();
  const projectId = user.state.selectedProject?.value;

  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [isSuccessAdd, setIsSuccessAdd] = useState<boolean>(false);
  const [isErrorAdd, setIsErrorAdd] = useState<boolean>(false);

  const [_, callApi] = useRequestHandler(
    estimationMutation.mutate,
    () => {
      setConfirmModal(false);
      setIsSuccessAdd(true);
      timeout(() => {
        setIsSuccessAdd(false);
        navigate("../mandays-estimation-tool");
      });
    },
    () => {
      setIsErrorAdd(true);
      setConfirmModal(false);
      timeout(() => setIsErrorAdd(false));
    },
  );

  const handleApiSubmit = (): void => {
    const data = createSubmitValue(
      state,
      projectId || "",
      user.state.user?.id || "",
    );
    callApi(data);
  };

  const handleBack = (): void => {
    navigate(-1);
  };

  useEffect(() => {
    if (Object.keys(state).length === 0) {
      navigate(`mandays-estimation-tool`);
    }
  }, []);

  return (
    <PageContainer>
      <Stack gap={2} mb={3}>
        <Grid container spacing={2} textAlign="center">
          <Grid item xs={12}>
            <Title title={t(mandaysCalculator.summaryTitle2)} color="#414145" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              {t(mandaysCalculator.summarySubtitle)}
            </Typography>
          </Grid>
        </Grid>
        <SummaryContent type="review" />
      </Stack>
      <Grid container textAlign="center">
        <Grid item xs={12}>
          <CustomButton colorVariant="neutral" onClick={handleBack}>
            {t(common.cancelBtn)}
          </CustomButton>
          <CustomButton onClick={() => setConfirmModal(true)} sx={{ ml: 3 }}>
            {t(mandaysCalculator.addEstimationBtn)}
          </CustomButton>
        </Grid>
      </Grid>
      <ConfirmModal
        open={confirmModal}
        message="All details has been confirmed. Please click Yes to proceed."
        onClose={() => setConfirmModal(false)}
        onConfirm={handleApiSubmit}
        confirmLabel="Confirm"
        closeLabel="Cancel"
      />
      {isSuccessAdd && (
        <Alert
          open={true}
          message="Estimation added succesfully."
          type="success"
        />
      )}
      {isErrorAdd && (
        <Alert
          open={true}
          message={t(LocalizationKey.common.errorMessage.genericError)}
          type="error"
        />
      )}
    </PageContainer>
  );
};

export default ReviewSummary;
