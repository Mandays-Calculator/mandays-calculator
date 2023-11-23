import type { ReactElement } from "react";
import type { TFunction } from "i18next";
import type { ShareFormValues } from "../../types";

import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Grid, Typography, Button } from "@mui/material";

import LocalizationKey from "~/i18n/key";

import { Form, Modal, ErrorMessage } from "~/components";
import {
  ControlledSelect,
  ControlledDateTimePicker,
  ControlledTextField,
} from "~/components/form/controlled";
import { CustomButton } from "~/components/form/button";
import { getFieldError } from "~/components/form/utils";

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
    },
    validationSchema: yup.object({
      shareBy: yup.string().required(t(common.errorMessage.required)),
      expiredIn: yup
        .string()
        .nullable()
        .when("shareBy", (shareBy, schema) => {
          return shareBy.includes("lta")
            ? schema.required("Please select the expiration date")
            : schema.nullable().notRequired();
        }),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: ShareFormValues) => {
      handleSubmit(values);
      setIsLinkGeneratedSuccess(true);
    },
  });

  const renderExpirationSelection = (): ReactElement => {
    return (
      <Grid container sx={{ p: 1, mt: 3 }}>
        <Grid item xs={12}>
          <ControlledDateTimePicker
            name="expiredIn"
            helperText={getFieldError(shareForm.errors, "expiredIn")}
          />
        </Grid>
      </Grid>
    );
  };

  const renderLink = (link: string): ReactElement => {
    return (
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            Link:
          </Typography>
          <ControlledTextField name="link" disabled value={link} />
        </Grid>
        <Grid container justifyContent="s" sx={{ mt: 1 }} rowGap={1}>
          <Grid item xs={3}>
            <Button variant="outlined">Back</Button>
          </Grid>
          <Grid item xs={9}>
            <Grid container justifyContent={"end"} rowGap={2} columnGap={2}>
              <Grid item>
                <Button variant="outlined">Go to link</Button>
              </Grid>
              <Grid item>
                <CustomButton>Copy to clipboard</CustomButton>
              </Grid>
            </Grid>
          </Grid>
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
          Share estimation details link:
        </Typography>
        <ControlledSelect
          name="shareBy"
          helperText={getFieldError(shareForm.errors, "shareBy")}
          options={[
            {
              label: "Limited-Time Access",
              value: "lta",
            },
            {
              label: "Permanent Access",
              value: "permanent",
            },
          ]}
        />
        {shareForm.values.shareBy === "lta" &&
          !isLinkGeneratedSuccess &&
          renderExpirationSelection()}
        {isLinkGeneratedSuccess &&
          renderLink(
            `${window.location.origin}/mandays-estimation-details?isShared=true`
          )}
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
