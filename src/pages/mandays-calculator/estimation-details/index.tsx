import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Typography, Grid, Stack } from "@mui/material";
import { CustomTab, PageContainer, Title } from "~/components";

import { CustomButton } from "~/components/form/button";
import { Select } from "~/components/form/select";

import LocalizationKey from "~/i18n/key";

import { Tasks } from "../tasks";
import Summary from "./summary";

const EstimationDetails = (): ReactElement => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const goBack = (): void => {
    navigate(-1);
  };

  const { mandaysCalculator } = LocalizationKey;
  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Title title={t(mandaysCalculator.label)} />
        </Grid>
        <Grid item>
          <Select
            name="team"
            value={""}
            sx={{ background: "#fff" }}
            options={[{ label: "Enrollment", value: "enrollment" }]}
          />
        </Grid>
      </Grid>

      <PageContainer>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography sx={{ fontSize: "1.1rem", mb: "25px" }}>
              Sprint 1
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Grid container justifyContent={"right"}>
              <Grid item xs={5}>
                <CustomButton>Export</CustomButton>
              </Grid>
              <Grid item xs={5}>
                <CustomButton>Share</CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <CustomTab
          tabs={[
            {
              label: "Summary",
              content: <Summary />,
            },
            {
              label: "Resources",
              content: <h1>Resources here</h1>,
            },
            {
              label: "Legend",
              content: <h1>Legend here</h1>,
            },
            {
              label: "Tasks",
              content: <Tasks />,
            },
          ]}
        />
        <Stack
          display="flex"
          justifyContent={"flex-end"}
          flexDirection={"row"}
          gap={2}
        >
          <CustomButton onClick={goBack}>BACK</CustomButton>
        </Stack>
      </PageContainer>
    </>
  );
};

export default EstimationDetails;
