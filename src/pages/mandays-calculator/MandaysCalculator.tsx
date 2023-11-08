import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import LocalizationKey from "~/i18n/key";
import { SvgIcon, Title } from "~/components";
import { PageContainer } from "~/components";
import { Typography, Grid } from "@mui/material";
import { mandaysCalculatorData } from "./utils/tableData";
import { Table } from "~/components";
import { CustomButton } from "~/components/form/button";

const MandaysCalculator = (): ReactElement => {
  const { columns, data }: any = mandaysCalculatorData;
  const { mandaysCalculator } = LocalizationKey;
  const { t } = useTranslation();
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
        <Table columns={columns} data={data} name="mandays-calculator" />
      </PageContainer>
    </>
  );
};

export default MandaysCalculator;
