import type { ReactElement } from "react";
import type { TFunction } from "i18next";
import type { ShareFormValues } from "../../types";

import { useState, useEffect } from "react";
import { Grid, Typography, Stack } from "@mui/material";

import LocalizationKey from "~/i18n/key";
import { Form, Modal, ErrorMessage, Alert } from "~/components";
import {
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { getFieldError } from "~/components/form/utils";
import { useShareLink } from "~/mutations/mandays-est-tool";
import { useRequestHandler } from "~/hooks/request-handler";

import { useShareMandaysForm } from "../../utils/estimationForms";
import GeneratedLink from "./generated-link";
import {
  timeTypeOptions,
  expiryOptions,
  convertToSeconds,
} from "../../../share-estimation-details/utils";
import { StyledBackButton, StyledGenerateButton } from "./styles";
import { useParams } from "react-router-dom";

type ShareModalProps = {
  isShare: boolean;
  setIsShare: (value: boolean) => void;
  t: TFunction<"translation", undefined>;
  handleSubmit?: (values: ShareFormValues) => void;
};

const ShareModal = ({
  isShare,
  setIsShare,
  t,
}: ShareModalProps): ReactElement => {
  const {
    common,
    mandaysCalculator: { modal },
  } = LocalizationKey;
  const ShareLink = useShareLink();
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const [estimationData, setEstimationData] = useState<{
    code: string;
    createdDate: number;
    expirationInSec: number;
    estimationId: string;
  }>();

  const [status, callApi] = useRequestHandler(
    ShareLink.mutate,
    (data) => {
      const parsedData = JSON.parse(data.data.data);
      setSuccess(true),
        setEstimationData({
          code: parsedData.code,
          createdDate: data.data.createdDate,
          expirationInSec: data.data.expirationInSec,
          estimationId: parsedData.mandaysEstimationId,
        });
    },
    () => setError(true),
  );
  const { estimationId } = useParams();
  const shareForm = useShareMandaysForm({
    onSubmit: (values: ShareFormValues) => {
      const expiryValue =
        values.shareBy === "custom"
          ? convertToSeconds(values.expiredIn, values.timeType)
          : values.shareBy === "noExpiration"
          ? 2592000 // for no expiration temporary 30days
          : convertToSeconds(values.shareBy, "hours");
      callApi({
        expirationDate: expiryValue,
        mandaysEstimationId: estimationId as string,
      });
    },
  });
  const handleClick = (): void => {
    setIsShare(false);
    shareForm.resetForm();
  };
  const renderAlert = (): ReactElement | undefined => {
    if (!isSuccess) {
      return (
        <Alert
          open={isError}
          duration={3000}
          message={t(LocalizationKey.common.errorMessage.genericError)}
          type={"error"}
        />
      );
    }
    return (
      <Alert
        open={isSuccess}
        message={t(LocalizationKey.mandaysCalculator.sharedLinkSuccessMessage)}
        duration={3000}
        type={"success"}
      />
    );
  };

  useEffect(() => setSuccess(false), [shareForm?.values?.shareBy]);
  const team = "Registration team";
  const renderExpirationSelection = (): ReactElement => {
    return (
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <ControlledTextField
            name="expiredIn"
            type="number"
            error={!!getFieldError(shareForm.errors, "expiredIn")}
            helperText={getFieldError(shareForm.errors, "expiredIn")}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledSelect
            disableNoneOption={true}
            name="timeType"
            options={timeTypeOptions}
            helperText={getFieldError(shareForm.errors, "timeType")}
            error={!!getFieldError(shareForm.errors, "timeType")}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <Modal
      title={
        <Stack width={isSuccess ? "485px" : "343px"}>
          <Typography
            variant="h5"
            textAlign={"center"}
            px={4}
            pt={1}
            fontWeight="bold"
          >
            {t(modal.shareTitle)}
            <Typography variant="body1" color={"primary"}>
              {t(modal.shareSubtitle)}: {team}
            </Typography>
          </Typography>
        </Stack>
      }
      open={isShare}
      maxWidth="md"
      onClose={handleClick}
    >
      <Stack mx={3}>
        <Form instance={shareForm}>
          <Typography variant="subtitle1" mb={1}>
            {t(modal.accessExpiry)}
          </Typography>
          <ControlledSelect
            name="shareBy"
            options={expiryOptions}
            disabled={isSuccess}
          />
          <ErrorMessage
            type="field"
            error={getFieldError(shareForm.errors, "shareBy")}
          />
          {shareForm.values.shareBy === "custom" &&
            !isSuccess &&
            renderExpirationSelection()}
          {isSuccess && estimationData && (
            <GeneratedLink
              estimationCode={estimationData.code}
              link={`${window.location.origin}/mandays-estimation-detail/${estimationData.estimationId}/${estimationData.code}/${estimationData.createdDate}/${estimationData.expirationInSec}`}
              setIsShare={setIsShare}
              t={t}
            />
          )}
          <Grid container mt={1}>
            <ErrorMessage error={getFieldError(shareForm.errors, "shareBy")} />
          </Grid>
          {!isSuccess && (
            <Grid container my={2} px={5}>
              <Grid item xs={4} pl={2}>
                <StyledBackButton
                  variant="text"
                  color="inherit"
                  onClick={handleClick}
                >
                  {t(common.backBtn)}
                </StyledBackButton>
              </Grid>
              <Grid item xs={8} pl={3}>
                <StyledGenerateButton
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {t(modal.generate)}
                </StyledGenerateButton>
              </Grid>
            </Grid>
          )}
        </Form>
        {!status.loading && renderAlert()}
      </Stack>
    </Modal>
  );
};

export default ShareModal;
