import type { ReactElement, ReactNode } from "react";
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
import { Grid } from "@mui/material";
import {
  CustomTab,
  Form,
  PageContainer,
  PageLoader,
  Stepper,
  SvgIcon,
  Title,
} from "~/components";

import { useGetTasks } from "~/queries/mandays-est-tool/MandaysEstimationTool";
import { useCommonOption } from "~/queries/common/options";

import LocalizationKey from "~/i18n/key";
import MandaysEstimationImgIcon from "~/assets/img/mandays_estimation_img_icon.png";

import { createExcel, generateEstimationData } from "../utils/excelHelper";
import { compilePDF } from "../utils/PDFhelper";

// Tab content
import Tasks from "./tasks";
import Summary from "./summary";
import Legend from "./legend";
import Resources from "./resources";
import Estimation from "./estimation";

// custom components
import { ExportModal } from "./components/export-modal";
import { ActionButtons } from "./components/action-buttons";
import { HeaderButtons } from "./components/header-buttons";
import { ShareModal } from "./components/share-modal";

import { initMandays } from "./utils/initialValue";
import { estimationDetailsSchema } from "./utils/schema";
import { StyledTeamLabel } from "../styles";

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

  const careerSteps = useCommonOption("career_step");
  const odcList = useCommonOption("odc");

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
      `SPRINT_${sprintName}_details_${date}_${time}.xlsx`,
    );
  };

  const mandaysForm = useFormik<MandaysForm>({
    initialValues: { ...initMandays, tasks: tasksData },
    validationSchema: estimationDetailsSchema(t),
    validateOnChange: true, // true for now to check every validation
    onSubmit: (val) => {
      console.log(val, "Submitting values");
    },
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
    mandaysForm.validateForm();
    setActiveTab(activeTab + 1);
  };

  const handleSave = (): void => {
    console.log("Saving sprint");
  };

  const renderIconOrImage = (isGeneratingPDF: boolean): ReactNode => {
    return isGeneratingPDF ? (
      <img src={MandaysEstimationImgIcon} alt="mandays-estimation-icon" />
    ) : (
      <SvgIcon name="mandays_estimation_tool" />
    );
  };

  const stepperObject: CustomSteps[] = [
    {
      label: t(mandaysCalculator.summaryTitle),
      icon: renderIconOrImage(isGeneratingPDF),
      content: <Summary mode={mode} />,
    },
    {
      label: t(mandaysCalculator.resourcesTitle),
      icon: renderIconOrImage(isGeneratingPDF),
      content: (
        <Resources
          isGeneratingPDF={isGeneratingPDF}
          mode={mode}
          apiCommonOptions={{ careerSteps: careerSteps, odc: odcList }}
        />
      ),
    },
    {
      label: t(mandaysCalculator.legend.title),
      icon: renderIconOrImage(isGeneratingPDF),
      content: <Legend mode={mode} />,
    },
    {
      label: t(mandaysCalculator.tasksTitle),
      icon: renderIconOrImage(isGeneratingPDF),
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
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Title title={t(mandaysCalculator.label)} />
          </Grid>
          <Grid item>
            {isGeneratingPDF && (
              <StyledTeamLabel color="primary">
                Team: <strong>Enrollment</strong>
              </StyledTeamLabel>
            )}
          </Grid>
        </Grid>
        <PageContainer>
          <Grid
            container
            justifyContent="space-between"
            sx={{ marginBottom: "2.3rem" }}
          >
            {!isGeneratingPDF && (
              <HeaderButtons
                setIsExport={setIsExport}
                setIsShare={setIsShare}
                mode={mode}
                isExposed={isExposed}
                t={t}
              />
            )}
          </Grid>
          <Form instance={mandaysForm}>
            {mode === "view" ? (
              <CustomTab
                defaultActiveTab={activeTab}
                tabs={
                  stepperObject.slice(0, -1) as {
                    label: ReactNode;
                    content: ReactNode;
                  }[]
                }
              />
            ) : (
              <Stepper steps={stepperObject} activeStep={activeTab} />
            )}

            {!isGeneratingPDF && (
              <ActionButtons
                mode={mode}
                activeTab={activeTab}
                handleBackEvent={handleBackEvent}
                handleNext={handleNext}
                handleSave={handleSave}
                length={stepperObject.length - 1}
              />
            )}
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
          handleSubmit={() => console.log("submit share modal")}
        />
      )}
    </>
  );
};

export default EstimationDetails;
