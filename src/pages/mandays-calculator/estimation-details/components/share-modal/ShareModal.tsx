import type { ReactElement } from "react";
import type { TFunction } from "i18next";
import type { ShareFormValues } from "../../types";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Grid, Typography, Stack } from "@mui/material";

import { Form, Modal, ErrorMessage } from "~/components";
import {
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { getFieldError } from "~/components/form/utils";
import LocalizationKey from "~/i18n/key";

import GeneratedLink from "./generated-link";
import { timeTypeOptions, expiryOptions, hrsNo } from "./utils";
import { StyledBackButton, StyledGenerateButton } from "./styles";

type ShareModalProps = {
  isShare: boolean;
  setIsShare: (value: boolean) => void;
  t: TFunction<"translation", undefined>;
  handleSubmit: (values: ShareFormValues) => void;
};

const ShareModal = ({
  isShare,
  setIsShare,
  t,
  handleSubmit,
}: ShareModalProps): ReactElement => {
  const {
    common,
    mandaysCalculator: { modal },
  } = LocalizationKey;
  const [isLinkGeneratedSuccess, setIsLinkGeneratedSuccess] =
    useState<boolean>(false);

  const shareForm = useFormik<ShareFormValues>({
    initialValues: {
      shareBy: "",
      expiredIn: "",
      timeType: "",
    },
    validationSchema: yup.object({
      shareBy: yup.string().required(t(common.errorMessage.required)),
      expiredIn: yup
        .string()
        .nullable()
        .when("shareBy", (shareBy, schema) => {
          return shareBy.includes("custom")
            ? schema.required("Please select the expiration date")
            : schema.nullable().notRequired();
        }),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: ShareFormValues) => {
      console.log("total hours", hrsNo(values));
      handleSubmit(values);
      setIsLinkGeneratedSuccess(true);
    },
  });

  const handleClick = (): void => {
    setIsShare(false);
    shareForm.resetForm();
  };

  useEffect(
    () => setIsLinkGeneratedSuccess(false),
    [shareForm?.values?.shareBy],
  );

  const renderExpirationSelection = (): ReactElement => {
    return (
      <Grid container>
        <Grid item xs={6}>
          <ControlledTextField
            name="expiredIn"
            helperText={getFieldError(shareForm.errors, "expiredIn")}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledSelect
            name="timeType"
            options={timeTypeOptions}
            helperText={getFieldError(shareForm.errors, "expiredIn")}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <Modal
      title={
        <Stack width={isLinkGeneratedSuccess ? "485px" : "343px"}>
          <Typography
            variant="h5"
            textAlign={"center"}
            px={4}
            pt={1}
            fontWeight="bold"
          >
            {t(modal.shareTitle)}
            <Typography variant="body1" color={"#2C8ED1"}>
              {t(modal.shareSubtitle)}: Registration team
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
            helperText={getFieldError(shareForm.errors, "shareBy")}
            options={expiryOptions}
          />
          {shareForm.values.shareBy === "custom" &&
            !isLinkGeneratedSuccess &&
            renderExpirationSelection()}
          {isLinkGeneratedSuccess && (
            <GeneratedLink
              link={`${window.location.origin}/mandays-estimation-details?isShared=true`}
              setIsShare={setIsShare}
              t={t}
            />
          )}
          <Grid container mt={1}>
            <ErrorMessage error={getFieldError(shareForm.errors, "ShareBy")} />
          </Grid>
          {!isLinkGeneratedSuccess && (
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
      </Stack>
    </Modal>
  );
};

export default ShareModal;
