import type { ReactElement } from "react";
import type { EstimationDetailsMode } from ".";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Typography, Grid, Stack } from "@mui/material";
import { CustomTab, PageContainer, Title } from "~/components";

import { CustomButton } from "~/components/form/button";
import { Select } from "~/components/form/select";

import LocalizationKey from "~/i18n/key";

import { Tasks } from "./tasks";
import Summary from "./summary";
import Legend from "./legend";
import Resources from "./resources";

const EstimationDetails = (): ReactElement => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const goBack = (): void => {
    navigate(-1);
  };

  const { mandaysCalculator, common } = LocalizationKey;
  const sprintName = "Sprint 1"; // Note: will come from API
  const mode: EstimationDetailsMode = "view";
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
      >
        <Grid item>
          <Title title={t(mandaysCalculator.label)} />
        </Grid>
        <Grid item>
          <Select
            name="team"
            value={"enrollment"}
            sx={{ background: "#fff" }}
            options={[{ label: "Enrollment", value: "enrollment" }]}
          />
        </Grid>
      </Grid>

      <PageContainer>
        <Grid
          container
          justifyContent="space-between"
        >
          <Grid item>
            <Typography sx={{ fontSize: "1.1rem", mb: "25px" }}>{sprintName}</Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Grid
              container
              justifyContent={"right"}
            >
              <Grid
                item
                xs={5}
              >
                <CustomButton>{t(common.exportBtn)}</CustomButton>
              </Grid>
              <Grid
                item
                xs={5}
              >
                <CustomButton>{t(common.shareBtn)}</CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <CustomTab
          tabs={[
            {
              label: "Summary",
              content: <Summary mode={"add"} />,
            },
            {
              label: "Resources",
              content: <Resources />,
            },
            {
              label: "Legend",
              content: <Legend mode={mode} />,
            },
            {
              label: "Tasks",
              content: <Tasks mode={mode} />,
            },
          ]}
        />
        <Stack
          display="flex"
          justifyContent={"flex-end"}
          flexDirection={"row"}
          gap={2}
        >
          <CustomButton onClick={goBack}>{t(common.backBtn)}</CustomButton>
        </Stack>
      </PageContainer>
    </>
  );
};

export default EstimationDetails;
