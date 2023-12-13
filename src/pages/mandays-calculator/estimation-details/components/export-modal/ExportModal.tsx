import type { FormikInstance } from "formik";
import type { ReactElement } from "react";
import LocalizationKey from "~/i18n/key";

import { Grid } from "@mui/material";

import { Form, Modal, ErrorMessage } from "~/components";
import { ControlledSelect } from "~/components/form/controlled";
import { CustomButton } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";

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
      maxWidth="xs"
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
        <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
          <Grid item xs={6} sx={{ p: 1 }}>
            <CustomButton
              fullWidth
              onClick={() => {
                setIsExport(false);
                exportForm.resetForm();
              }}
              colorVariant="error"
            >
              {t(common.backBtn)}
            </CustomButton>
          </Grid>
          <Grid item xs={6} sx={{ p: 1 }}>
            <CustomButton fullWidth type="submit">
              {t(common.exportBtn)}
            </CustomButton>
          </Grid>
        </Grid>
      </Form>
    </Modal>
  );
};

export default ExportModal;