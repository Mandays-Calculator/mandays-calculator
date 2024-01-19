import type { ReactElement } from "react";
import type { Location } from "react-router-dom";
import type { ReviewSummaryType } from "..";

import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { PageContainer, Title } from "~/components";
import { CustomButton } from "~/components/form/button";
import LocalizationKey from "~/i18n/key";
import SummaryContent from "../summary/summary-content";

const ReviewSummary = (): ReactElement => {
  const { state }: Location<ReviewSummaryType> = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mandaysCalculator, common } = LocalizationKey;

  const handleApiSubmit = (): void => console.log(state);

  const handleBack = (): void => {
    navigate(`./../add-sprint`, {
      state: state,
    });
  };

  return (
    <PageContainer>
      <Stack gap={2} mb={3}>
        <Grid container spacing={2} textAlign="center">
          <Grid item xs={12}>
            <Title title={t(mandaysCalculator.summaryTitle)} color="#414145" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              {t(mandaysCalculator.summarySubtitle)}
            </Typography>
          </Grid>
        </Grid>
        <SummaryContent />
      </Stack>
      <Grid container textAlign="center">
        <Grid item xs={12}>
          <CustomButton colorVariant="neutral" onClick={handleBack}>
            {t(common.cancelBtn)}
          </CustomButton>
          <CustomButton onClick={() => handleApiSubmit()} sx={{ ml: 3 }}>
            {t(mandaysCalculator.addEstimationBtn)}
          </CustomButton>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ReviewSummary;
