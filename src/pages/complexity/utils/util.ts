import { ComplexityForm } from ".";

import { Schema, object, string, number, ref } from "yup";
export const complexityInitialValues: ComplexityForm = {
  complexityName: "",
  numberOfDayFrom: "",
  numberOfDayTo: "",
  numberOfFeaturesFrom: "",
  numberOfFeaturesTo: "",
  description: "",
  samples: "",
};

export const complexityFormSchema: Schema<ComplexityForm> = object({
  complexityName: string().required().max(20),
  numberOfDayFrom: number().integer().positive(),
  numberOfDayTo: number().integer().min(ref("numberOfDayFrom")),
  numberOfFeaturesFrom: number().integer(),
  numberOfFeaturesTo: number().integer().min(ref("numberOfFeaturesFrom")),
  description: string().required().max(256),
  samples: string().required().max(1024),
});
