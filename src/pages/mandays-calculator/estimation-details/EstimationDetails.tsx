import type { ReactElement } from "react";
import type {
  MandaysForm,
  TaskType,
  EstimationDetailsProps,
  ReviewSummaryType,
} from ".";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Typography, Grid } from "@mui/material";
import {
  Form,
  PageContainer,
  PageLoader,
  Stepper,
  SvgIcon,
  Title,
} from "~/components";
import { Select } from "~/components/form/select";
import { useGetTasks } from "~/queries/mandays-est-tool/mandaysEstimationTool";
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
import { HeaderButtons } from "./components/header-buttons";
import { ShareModal } from "./components/share-modal";
import Estimation from "./estimation";
import { initMandays } from "./utils";

const EstimationDetails = (props: EstimationDetailsProps): ReactElement => {
  const { isExposed } = props;
  const { mandaysCalculator, common } = LocalizationKey;

  const navigate = useNavigate();
  const { state }: Location<ReviewSummaryType> = useLocation();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [isExport, setIsExport] = useState<boolean>(false);
  const [isShare, setIsShare] = useState<boolean>(false);

  const mode = state?.mode || "view";
  const sprintName = "Sprint 1"; // Note: will come from API

  const { data } = useGetTasks({
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const tasksData: TaskType[] =
    data?.data?.map((task) => {
      return {
        id: task.id,
        title: task.name,
        description: task.description,
        createdDate: task.createdDate,
        status: "unselected",
      };
    }) || [];

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

  const mandaysForm = useFormik<MandaysForm>({
    initialValues: { ...initMandays, tasks: tasksData },
    onSubmit: (val) =>
      navigate("./../summary", {
        state: {
          ...val,
          sprintName: sprintName,
          mode: mode,
        },
      }),
    enableReinitialize: true,
  });

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

  const stepperObject: CustomSteps[] = [
    {
      label: t(mandaysCalculator.summaryTitle),
      icon: <SvgIcon name="mandays_estimation_tool" />,
      content: <Summary mode={mode} />,
    },
    {
      label: t(mandaysCalculator.resourcesTitle),
      icon: <SvgIcon name="mandays_estimation_tool" />,
      content: <Resources isGeneratingPDF={isGeneratingPDF} mode={mode} />,
    },
    {
      label: t(mandaysCalculator.legend.title),
      icon: <SvgIcon name="mandays_estimation_tool" />,
      content: <Legend mode={mode} />,
    },
    {
      label: t(mandaysCalculator.tasksTitle),
      icon: <SvgIcon name="mandays_estimation_tool" />,
      content: <Tasks mode={mode} />,
    },
    {
      label: t(mandaysCalculator.estimation.title),
      icon: <SvgIcon name="mandays_estimation_tool" />,
      content: <Estimation mode={mode} />,
    },
  ];

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
              disabled={isExposed}
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
            <HeaderButtons
              setIsExport={setIsExport}
              setIsShare={setIsShare}
              mode={mode}
              isExposed={isExposed}
              t={t}
            />
          </Grid>
          <Grid py={5}></Grid>
          <Form instance={mandaysForm}>
            <Stepper
              steps={
                mode === "view" ? stepperObject.slice(0, -1) : stepperObject
              }
              activeStep={activeTab}
            />
            <ActionButtons
              mode={mode}
              activeTab={activeTab}
              handleBackEvent={handleBackEvent}
              handleNext={handleNext}
              handleSave={handleSave}
              length={stepperObject.length - 1}
            />
          </Form>
        </PageContainer>
      </div>
      {isExport && (
        <ExportModal
          isExport={isExport}
          setIsExport={setIsExport}
          exportForm={exportForm}
          t={t}
        />
      )}
      {isShare && (
        <ShareModal
          isShare={isShare}
          setIsShare={setIsShare}
          t={t}
          handleSubmit={() => console.log("submit")}
        />
      )}
    </>
  );
};

export default EstimationDetails;
