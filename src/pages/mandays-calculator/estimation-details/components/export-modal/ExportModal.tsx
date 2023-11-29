import type { ReactElement } from "react";
import type { TFunction } from "i18next";
import type { ExportFormValues } from "../../types";

import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Grid } from "@mui/material";

import LocalizationKey from "~/i18n/key";

import { Form, Modal, ErrorMessage } from "~/components";
import { ControlledSelect } from "~/components/form/controlled";
import { CustomButton } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";

type ExportModalProps = {
  isExport: boolean;
  setIsExport: (value: boolean) => void;
  t: TFunction<"translation", undefined>;
  handleSubmit: (values: ExportFormValues) => void;
};

const ExportModal = ({
  isExport,
  setIsExport,
  t,
  handleSubmit,
}: ExportModalProps): ReactElement => {
  const { mandaysCalculator, common } = LocalizationKey;

  const exportForm = useFormik<ExportFormValues>({
    initialValues: {
      exportBy: "",
    },
    validationSchema: yup.object({
      exportBy: yup.string().required(t(common.errorMessage.required)),
    }),
    validateOnChange: true,
    onSubmit: (values: ExportFormValues) => {
      handleSubmit(values);
    },
  });

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
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setIsExport(false);
                exportForm.resetForm();
              }}
            >
              {t(common.backBtn)}
            </Button>
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
