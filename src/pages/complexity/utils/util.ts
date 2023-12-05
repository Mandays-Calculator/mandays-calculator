import { MutationOptions } from "react-query";
import { ComplexityForm, FormContext } from ".";

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

export const handleSplitValues = (value: string = "") =>
  value?.split("-").map((value) => (value === " " ? "" : Number(value)));

export const mutationOptions = <T extends { status: number }, U>(
  setContext: (context: FormContext) => void
): MutationOptions<T, Error, U> => {
  return {
    onSuccess: (data) => {
      alert(`success ${data.status}`);
      setContext("");
    },
    onError: (err) => console.error(err),
  };
};
