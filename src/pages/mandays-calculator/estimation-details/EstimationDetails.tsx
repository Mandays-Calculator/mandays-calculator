import type { ReactElement, ReactNode } from "react";
import type { EstimationDetailsProps, MandaysForm, ReviewSummaryType } from ".";

import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

import {
  Alert,
  CustomTab,
  Form,
  PageContainer,
  PageLoader,
  Stepper,
  SvgIcon,
  Title,
} from "~/components";

import { useCommonOption } from "~/queries/common/options";
import { useGetEstimationDetails } from "~/queries/mandays-est-tool/mandaysEstimationTool";
import { useScrollToError } from "~/hooks/scroll-to-error";

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
import { useExportMandaysForm, useMandaysForm } from "./utils/estimationForms";

const EstimationDetails = (props: EstimationDetailsProps): ReactElement => {
  const { isExposed, linkDetails } = props;
  const { mandaysCalculator } = LocalizationKey;
  const location = useLocation();

  const navigate = useNavigate();
  const { state }: Location<ReviewSummaryType> = useLocation();
  const { t } = useTranslation();
  const scrollToMuiError = useScrollToError();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [validateCount, setValidateCount] = useState<number>(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [isExport, setIsExport] = useState<boolean>(false);
  const [isShare, setIsShare] = useState<boolean>(false);
  const estimationId = location.pathname.split("/")[2];
  const mode = state?.mode || "view";

  useEffect(() => {
    return () => {
      setValidateCount(0);
    };
  }, [location.pathname]);
  const complexities = useCommonOption("complexity");
  const careerSteps = useCommonOption("career_step");
  const odcList = useCommonOption("odc");
  const {
    data: estimationData,
    isError: estimationError,
    isLoading: estimationLoading,
  } = useGetEstimationDetails(estimationId);

  const getCareerStepSingleVal: string[] = careerSteps.map(
    (item) => item.label,
  );

  const switchTab = (tabId: number): void => {
    setActiveTab(tabId);
  };

  const handlePDFExport = (): void => {
    setIsExport(false);
    compilePDF({
      callback1: setIsGeneratingPDF,
      switchTabCallback: switchTab,
      estimationName: estimationName,
    });
  };
  const constructInitialValue = useCallback((): MandaysForm => {
    if (mode === "edit" || mode === "view") {
      return estimationData
        ? (estimationData.data as unknown as MandaysForm)
        : { ...initMandays };
    }
    return { ...initMandays };
  }, [estimationData?.data, mode]);

  const mandaysForm = useMandaysForm({
    getCareerStepSingleVal: getCareerStepSingleVal,
    initialValue: isExposed
      ? (linkDetails?.data as unknown as MandaysForm)
      : constructInitialValue(),
    onSubmit: (val) => {
      navigate("../mandays-estimation-tool/summary", {
        state: { ...val, mode: mode },
      });
    },
  });

  const estimationName = mandaysForm.values?.summary?.estimationName || "-";
  const exportForm = useExportMandaysForm({
    onSubmit: (values) => {
      const { exportBy } = values;
      if (exportBy === "pdf") {
        handlePDFExport();
      } else {
        createExcel(generateEstimationData({ t }), estimationName);
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
  const handleNext = useCallback(async (): Promise<void> => {
    if (mode === "add" || mode === "edit") {
      await mandaysForm.validateForm();
      const formError = mandaysForm.errors;
      const currentTab = Object.keys(mandaysForm.values)[activeTab];
      if (validateCount > 0) {
        if (Object.keys(formError).includes(currentTab)) {
          scrollToMuiError();
          return;
        }
        setValidateCount(0);
        setActiveTab(activeTab + 1);
      }
      setValidateCount(validateCount + 1);
    } else {
      setActiveTab(activeTab + 1);
    }
  }, [
    mode,
    mandaysForm.values,
    mandaysForm.errors,
    validateCount,
    activeTab,
    setValidateCount,
  ]);

  const renderIconOrImage = (isGeneratingPDF: boolean): ReactNode => {
    return isGeneratingPDF ? (
      <img src={MandaysEstimationImgIcon} alt="mandays-estimation-icon" />
    ) : (
      <SvgIcon name="mandays_estimation_tool" />
    );
  };

  const stepperObject: CustomSteps[] = [
    {
      label:
        mode === "add"
          ? t(mandaysCalculator.summaryTitle)
          : t(mandaysCalculator.summaryTitle2),
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
      content: (
        <Legend
          mode={mode}
          apiCommonOptions={{
            complexities: complexities,
            careerSteps: careerSteps,
          }}
        />
      ),
    },
    {
      label: t(mandaysCalculator.tasksTitle),
      icon: renderIconOrImage(isGeneratingPDF),
      content: <Tasks mode={mode} isGeneratingPDF={isGeneratingPDF} />,
    },
    {
      label: t(mandaysCalculator.estimation.title),
      icon: <SvgIcon name="mandays_estimation_tool" />,
      content: (
        <Estimation
          mode={mode}
          apiCommonOptions={{ careerSteps: careerSteps }}
        />
      ),
    },
  ];

  if (estimationLoading) {
    return (
      <PageLoader labelOnLoad={t(mandaysCalculator.estimation.labelLoader)} />
    );
  }

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
        </Grid>
        <PageContainer>
          <Grid container justifyContent="space-between" mb={2}>
            {mode === "view" && (
              <Grid item xs={6}>
                <Typography variant="body1" fontWeight="bold">
                  {estimationName}
                </Typography>
              </Grid>
            )}
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
                onTabChange={(_, tabValue) => setActiveTab(tabValue)}
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
                handleSave={() => mandaysForm.submitForm()}
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
      {isExposed !== true && estimationError && (
        <Alert
          type="error"
          duration={3000}
          open={estimationError}
          message={t(LocalizationKey.common.errorMessage.genericError)}
        />
      )}
    </>
  );
};

export default EstimationDetails;
