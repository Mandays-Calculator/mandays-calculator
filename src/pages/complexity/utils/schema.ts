import type { TFunction } from "i18next";

import * as yup from "yup";

import LocalizationKey from "~/i18n/key";

const { complexity: { validationInfo } } = LocalizationKey;

export const complexityFormSchema = (t: TFunction) => {
  return yup.object().shape({
    complexityName: yup
      .string()
      .max(20, t(validationInfo.maxComplexityName)),
    numberOfHoursFrom: yup
      .number()
      .typeError(t(validationInfo.noOfHours))
      .integer(t(validationInfo.intNoOfHours))
      .positive(t(validationInfo.posNoOfHours))
      .min(1, t(validationInfo.minNoOfHours)),
    numberOfHoursTo: yup
      .number()
      .typeError(t(validationInfo.noOfHours))
      .integer(t(validationInfo.intNoOfHours))
      .positive(t(validationInfo.posNoOfHours))
      .min(yup.ref("numberOfHoursFrom"), t(validationInfo.maxNoOfHours)),
    numberOfFeaturesFrom: yup
      .number()
      .integer(t(validationInfo.intNoOfFeatures))
      .positive(t(validationInfo.posNoOfFeatures))
      .min(1, t(validationInfo.minNoOfFeatures)),
    numberOfFeaturesTo: yup
      .number()
      .integer(t(validationInfo.intNoOfFeatures))
      .positive(t(validationInfo.posNoOfFeatures))
      .min(yup.ref("numberOfFeaturesFrom"), t(validationInfo.maxNoOfFeatures)),
    description: yup
      .string()
      .max(256, t(validationInfo.maxDescription)),
    samples: yup
      .string()
      .max(1024, t(validationInfo.maxSamples)),
  });
}