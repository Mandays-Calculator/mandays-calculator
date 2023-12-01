import type { ReactElement } from "react";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocalizationKey from "~/i18n/key";
import { Table } from "~/components";
import { LegendListColumns } from "~/pages/mandays-calculator/utils/columns";
import { MandaysForm } from "../types";

interface LegendProps {
  mode: EstimationDetailsMode;
}

const Legend = (props: LegendProps): ReactElement => {
  const { mode } = props;
  const { t } = useTranslation();
  const { mandaysCalculator } = LocalizationKey;

  const { values } = useFormikContext<MandaysForm>();

  const inputView = ["add", "edit"];
  const isInput: boolean = inputView.includes(mode);
  const columnsMemo = useMemo(() => LegendListColumns({ t, isInput }), []);

  return (
    <Stack gap={3}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color="primary"
      >
        {t(mandaysCalculator.legend.tableTitle)}
      </Typography>
      <Table
        name="legend-table"
        columns={columnsMemo}
        data={values.legend}
      />
    </Stack>
  );
};

export default Legend;
