import type { ReactElement } from "react";
import type { LegendColumn } from "~/pages/mandays-calculator/utils/types";
import type { EstimationDetailsMode } from "..";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocalizationKey from "~/i18n/key";
import { Form, Table } from "~/components";
import { legendData } from "~/pages/mandays-calculator/utils/tableData";
import { LegendListColumns } from "~/pages/mandays-calculator/utils/columns";
import { CustomButton } from "~/components/form/button";

interface LegendProps {
  mode: EstimationDetailsMode
}

interface LegendForm {
  legendValues: LegendColumn[]
}


const Legend = (props: LegendProps): ReactElement => {
  const { mode } = props;
  const { t } = useTranslation();
  const {
    mandaysCalculator,
    common
  } = LocalizationKey;

  const legendForm = useFormik<LegendForm>({
    initialValues: {
      legendValues: [...legendData]
    },
    onSubmit: (values) => console.log('Submit API will be called here', values.legendValues),
    enableReinitialize: true
  })

  const { values } = legendForm;
  const dataMemoized = useMemo(() => values.legendValues, [values.legendValues])
  const inputView = ['add', 'edit'];
  const isInput: boolean = inputView.includes(mode);

  return (
    <Form instance={legendForm}>
      <Stack gap={3}>
        <Typography variant="subtitle1" fontWeight="bold" color="primary">
          {t(mandaysCalculator.legend.tableTitle)}
        </Typography>
        <Table name="legend-table" columns={LegendListColumns({ t, isInput })} data={dataMemoized} />
        { isInput && (
          <Stack
            display="flex"
            justifyContent="flex-end"
            flexDirection="row"
          >
            <CustomButton type="submit">{t(common.submit)}</CustomButton>
          </Stack>
        )}
      </Stack>
    </Form>
  )
}

export default Legend; 