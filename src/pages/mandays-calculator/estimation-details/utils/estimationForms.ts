import type { MandaysForm } from "..";
import { useFormik } from "formik";
import { t } from "i18next";
import * as yup from "yup";
import LocalizationKey from "~/i18n/key";
import { estimationDetailsSchema } from "./schema";

interface MandaysFormParams {
  getCareerStepSingleVal: string[];
  onSubmit: (data: MandaysForm) => void;
  initialValue: MandaysForm;
}

interface ExportMandaysFormParams {
  onSubmit: ({ exportBy }: { exportBy: string }) => void;
}

interface ShareFormValuesParams {
  onSubmit: (data: ShareFormValues) => void;
}

interface ShareFormValues {
  shareBy: string;
  expiredIn: string;
  timeType: string;
}

const { common } = LocalizationKey;
/**
 * Custom hooks for handling the Mandays form using Formik.
 * Provides a useFormik instance with initial values, validation schema, and submission callback.
 */
export const useMandaysForm = ({
  getCareerStepSingleVal,
  onSubmit,
  initialValue,
}: MandaysFormParams) => {
  return useFormik<MandaysForm>({
    initialValues: initialValue,
    validationSchema: estimationDetailsSchema(t, getCareerStepSingleVal),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });
};

export const useExportMandaysForm = ({ onSubmit }: ExportMandaysFormParams) => {
  return useFormik<{ exportBy: string }>({
    initialValues: {
      exportBy: "",
    },
    validationSchema: yup.object({
      exportBy: yup.string().required(t(common.errorMessage.required)),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: onSubmit,
  });
};

export const useShareMandaysForm = ({ onSubmit }: ShareFormValuesParams) => {
  return useFormik<ShareFormValues>({
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
    onSubmit: onSubmit,
  });
};
