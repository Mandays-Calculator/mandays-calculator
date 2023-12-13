import { MutationOptions } from "react-query";
import { ComplexityForm } from ".";

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
  handleClose: () => void,
  setIsEditError: (isEditError: boolean) => void,
  setIsEditSuccess: (isEditSuccess: boolean) => void,
): MutationOptions<T, Error, U> => {
  return {
    onSuccess: () => {
      handleClose();
      setIsEditSuccess(true);
    },
    onError: (err) => {
      console.error(err);
      setIsEditError(true);
    },
  };
};
