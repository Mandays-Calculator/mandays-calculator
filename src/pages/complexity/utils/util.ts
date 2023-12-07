import { MutationOptions } from "react-query";
import { ComplexityForm, FormContext } from ".";

export const complexityInitialValues: ComplexityForm = {
  complexityName: "",
  numberOfDayFrom: "",
  numberOfDayTo: "",
  numberOfFeaturesFrom: "",
  numberOfFeaturesTo: "",
  description: "",
  samples: "",
};

export const handleSplitValues = (value: string = "") =>
  value?.split("-").map((value) => (value === " " ? "" : Number(value)));

export const mutationOptions = <T extends { status: number }, U>(
  setContext: (context: FormContext) => void
): MutationOptions<T, Error, U> => {
  return {
    onSuccess: () => {
      setContext("");
    },
    onError: (err) => console.error(err),
  };
};
