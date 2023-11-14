import { useState, type ReactElement } from "react";
import type { EstimationDetailsMode } from ".";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Typography, Grid, Stack } from "@mui/material";
import { CustomTab, PageContainer, PageLoader, Title } from "~/components";
import { CustomButton } from "~/components/form/button";
import { Select } from "~/components/form/select";
import { Modal } from "~/components";
import * as yup from "yup";
import LocalizationKey from "~/i18n/key";

import { createExcel, generateEstimationData } from "../utils/excelHelper";
import { compilePDF } from "../utils/PDFhelper";

import { Tasks } from "./tasks";
import Summary from "./summary";
import Legend from "./legend";
import Resources from "./resources";
import { FormikInstance, useFormik } from "formik";
import { ControlledSelect } from "~/components/form/controlled";
import { getFieldError } from "~/components/form/utils";
import Form from "~/components/form/Form";
import { ErrorMessage } from "~/components/form/error-message";

const renderExportModal = ({
  isExport,
  setIsExport,
  exportForm,
  t,
}: {
  isExport: boolean;
  setIsExport: (value: boolean) => void;
  exportForm: FormikInstance<{ exportBy: string }>;
  t: any;
}): ReactElement => {
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

const EstimationDetails = (): ReactElement => {
  const { mandaysCalculator, common } = LocalizationKey;
  const sprintName = "Sprint 1"; // Note: will come from API
  const mode: EstimationDetailsMode = "view";

  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [isExport, setIsExport] = useState<boolean>(false);

  const switchTab = (tabId: number): void => {
    setActiveTab(tabId);
  };

  const handlePDFExport = (): void => {
    setIsExport(false);
    compilePDF({
      callback1: setIsGeneratingPDF,
      switchTabCallback: switchTab,
      sprintName: sprintName,
    });
  };

  const handleExcelExport = (): void => {
    const now = new Date();
    const date = now.toLocaleDateString("en-CA").replaceAll("/", "-");
    const time = now.toLocaleTimeString("en-GB").replaceAll(":", "-");

    createExcel(
      generateEstimationData({ t }),
      `SPRINT_${sprintName}_details_${date}_${time}.xlsx`
    );
  };

  const exportForm = useFormik<{ exportBy: string }>({
    initialValues: {
      exportBy: "",
    },
    validationSchema: yup.object({
      exportBy: yup.string().required(t(common.errorMessage.required)),
    }),
    validateOnChange: true,
    onSubmit: (values) => {
      const { exportBy } = values;
      if (exportBy === "pdf") {
        handlePDFExport();
      } else {
        handleExcelExport();
      }
    },
  });

  const navigate = useNavigate();

  const goBack = (): void => {
    navigate(-1);
  };

  return (
    <>
      {isGeneratingPDF && (
        <PageLoader labelOnLoad={t(mandaysCalculator.generatingPDFLabel)} />
      )}
      <div id="divToPrint">
        <Grid container justifyContent="space-between">
          <Grid item>
            <Title title={t(mandaysCalculator.label)} />
          </Grid>
          <Grid item>
            <Select
              name="team"
              value={"enrollment"}
              sx={{ background: "#fff" }}
              options={[{ label: "Enrollment", value: "enrollment" }]} //will replace via teams options
            />
          </Grid>
        </Grid>
        <PageContainer>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography sx={{ fontSize: "1.1rem", mb: "25px" }}>
                {sprintName}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Grid container justifyContent={"right"}>
                <Grid item xs={5}>
                  <CustomButton onClick={() => setIsExport(true)}>
                    {t(common.exportBtn)}
                  </CustomButton>
                </Grid>
                <Grid item xs={5}>
                  <CustomButton>{t(common.shareBtn)}</CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <CustomTab
            defaultActiveTab={activeTab}
            tabs={[
              {
                label: t(mandaysCalculator.summaryTitle),
                content: <Summary />,
              },
              {
                label: t(mandaysCalculator.resourcesTitle),
                content: <Resources isGeneratingPDF={isGeneratingPDF} />,
              },
              {
                label: t(mandaysCalculator.legend.title),
                content: <Legend mode={mode} />,
              },
              {
                label: t(mandaysCalculator.tasksTitle),
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
      </div>
      {isExport && renderExportModal({ isExport, setIsExport, exportForm, t })}
    </>
  );
};

export default EstimationDetails;
