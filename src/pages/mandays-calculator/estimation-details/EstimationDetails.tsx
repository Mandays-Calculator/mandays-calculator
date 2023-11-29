import { type ReactElement } from "react";
import type {
  EstimationDetailsMode,
  EstimationDetailsProps,
  ExportFormValues,
} from ".";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Location, useLocation, useNavigate } from "react-router-dom";

import { Typography, Grid } from "@mui/material";
import { CustomTab, PageContainer, PageLoader, Title } from "~/components";
import { CustomButton } from "~/components/form/button";
import { Select } from "~/components/form/select";

import LocalizationKey from "~/i18n/key";

import { createExcel, generateEstimationData } from "../utils/excelHelper";
import { compilePDF } from "../utils/PDFhelper";

// Tab content
import Tasks from "./tasks";
import Summary from "./summary";
import Legend from "./legend";
import Resources from "./resources";

import { ExportModal } from "./components/export-modal";
import { ActionButtons } from "./components/action-buttons";
import { ShareModal } from "./components/share-modal";

const EstimationDetails = (props: EstimationDetailsProps): ReactElement => {
  const { isShared } = props;
  const { mandaysCalculator, common } = LocalizationKey;

  const navigate = useNavigate();
  const { state }: Location<{ mode: EstimationDetailsMode }> = useLocation();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [isExport, setIsExport] = useState<boolean>(false);

  const mode = state?.mode || "view";
  const sprintName = "Sprint 1"; // Note: will come from API

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

  const handleExportSubmit = (formValues: ExportFormValues): void => {
    const { exportBy } = formValues;
    if (exportBy === "pdf") {
      handlePDFExport();
    } else {
      handleExcelExport();
    }
  };

  const goBack = (): void => {
    navigate(-1);
  };

  const handleBackEvent = (): void => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    } else {
      goBack();
    }
  };

  const handleNext = (): void => {
    setActiveTab(activeTab + 1);
  };

  const handleSave = (): void => {
    console.log("Saving sprint");
    // run an API for saving the sprint
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
              disabled={isShared}
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
            {!isShared && (
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
            )}
          </Grid>
          <CustomTab
            onTabChange={(_, value) => setActiveTab(value)}
            defaultActiveTab={activeTab}
            tabs={[
              {
                label: t(mandaysCalculator.summaryTitle),
                content: <Summary mode={mode} />,
              },
              {
                label: t(mandaysCalculator.resourcesTitle),
                content: (
                  <Resources isGeneratingPDF={isGeneratingPDF} mode={mode} />
                ),
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
          <ActionButtons
            activeTab={activeTab}
            handleBackEvent={handleBackEvent}
            handleNext={handleNext}
            handleSave={handleSave}
          />
        </PageContainer>
      </div>
      {isExport && (
        <ExportModal
          isExport={isExport}
          setIsExport={setIsExport}
          handleSubmit={handleExportSubmit}
          t={t}
        />
      )}
      {false && (
        <ShareModal
          isShare={true}
          setIsShare={() => console.log("running")}
          t={t}
          handleSubmit={() => console.log("submit")}
        />
      )}
    </>
  );
};

export default EstimationDetails;
