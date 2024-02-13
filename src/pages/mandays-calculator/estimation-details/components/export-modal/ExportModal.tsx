import type { FormikInstance } from "formik";
import type { ReactElement } from "react";
import LocalizationKey from "~/i18n/key";

import { Grid, Stack } from "@mui/material";

import { Form, Modal, ErrorMessage } from "~/components";
import { ControlledSelect } from "~/components/form/controlled";
import { CustomButton } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";

const modalSx = {
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      padding: '1.5rem',
      borderRadius: '1rem',
      boxShadow: '1rem',
    },
  },
}

type ExportModalProps = {
  isExport: boolean;
  setIsExport: (value: boolean) => void;
  exportForm: FormikInstance<{ exportBy: string }>;
  t: any;
};

const ExportModal = ({
  isExport,
  setIsExport,
  exportForm,
  t,
}: ExportModalProps): ReactElement => {
  const { mandaysCalculator, common } = LocalizationKey;
  return (
    <Modal
      open={isExport}
      title={t(mandaysCalculator.exportConfirmation)}
      maxWidth="md"
      sx={modalSx}
      onClose={() => {
        setIsExport(false);
        exportForm.resetForm();
      }}
    >
      <Form instance={exportForm}>
        <ControlledSelect
          name="exportBy"
          helperText={getFieldError(exportForm.errors, "exportBy")}
          options={[
            {
              label: t(mandaysCalculator.options.excel),
              value: "excel",
            },
            {
              label: t(mandaysCalculator.options.pdf),
              value: "pdf",
            },
          ]}
        />
        <Grid container mt={1}>
          <ErrorMessage error={getFieldError(exportForm.errors, "exportBy")} />
        </Grid>
        <Stack mt={2} direction='row' gap={2} justifyContent='center'>
          <CustomButton
            onClick={() => {
              setIsExport(false);
              exportForm.resetForm();
            }}
            colorVariant="neutral"
          >
            {t(common.backBtn)}
          </CustomButton>
          <CustomButton type="submit">
            {t(common.exportBtn)}
          </CustomButton>
        </Stack>
      </Form>
    </Modal>
  );
};

export default ExportModal;
