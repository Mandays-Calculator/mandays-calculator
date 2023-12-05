import type { ReactElement } from "react";
import type { TFunction } from "i18next";
import type { ShareFormValues } from "../../types";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Grid, Typography, Button } from "@mui/material";

import { Form, Modal, ErrorMessage } from "~/components";
import {
  ControlledSelect,
  ControlledTextField,
} from "~/components/form/controlled";
import { CustomButton } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";
import LocalizationKey from "~/i18n/key";

import GeneratedLink from "./generated-link";

import { 
  timeTypeOptions,
  expiryOptions,
  hrsNo,
} from "./utils";

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
  const { common } = LocalizationKey;
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
      console.log('total hours', hrsNo(values))
      handleSubmit(values);
      setIsLinkGeneratedSuccess(true);
    },
  });

  useEffect(() => setIsLinkGeneratedSuccess(false), [shareForm?.values?.shareBy])

  const renderExpirationSelection = (): ReactElement => {
    return (
      <Grid container sx={{ p: 1, mt: 3 }} spacing={2}>
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
        <Typography variant="h5" sx={{ p: 3 }} fontWeight="bold">
          Share with Others
          <Typography variant="body1" sx={{ mt: 1 }}>
            Project owned by: Registration team
          </Typography>
        </Typography>
      }
      open={isShare}
      maxWidth="xs"
      onClose={() => {
        setIsShare(false);
        shareForm.resetForm();
      }}
    >
      <Form instance={shareForm}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Access Expiry:
        </Typography>
        {
          // need to change into 12h, 24h, 48h, custom options
        }
        <ControlledSelect
          name="shareBy"
          helperText={getFieldError(shareForm.errors, "shareBy")}
          options={expiryOptions}
        />
        {shareForm.values.shareBy === "custom" &&
          !isLinkGeneratedSuccess &&
          renderExpirationSelection()}
        {isLinkGeneratedSuccess && 
          <GeneratedLink 
            link={`${window.location.origin}/mandays-estimation-details?isShared=true`}
            setIsShare={setIsShare} 
          />
        }
        <Grid container mt={1}>
          <ErrorMessage error={getFieldError(shareForm.errors, "ShareBy")} />
        </Grid>
        {!isLinkGeneratedSuccess && (
          <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
            <Grid item xs={6} sx={{ p: 1 }}>
              <Button
                fullWidth
                onClick={() => {
                  setIsShare(false);
                  shareForm.resetForm();
                }}
                variant="outlined"
              >
                {t(common.backBtn)}
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ p: 1 }}>
              <CustomButton fullWidth type="submit">
                Generate link
              </CustomButton>
            </Grid>
          </Grid>
        )}
      </Form>
    </Modal>
  );
};

export default ShareModal;
