import { ForGetComplexities } from "~/api/complexity";

export type FormContext = '' | 'Add' | 'Edit' | 'Delete'

export type DataType = ForGetComplexities;

export type ComplexityForm = {
  complexityName: string;
  numberOfDayFrom?: number | string;
  numberOfDayTo?: number | string;
  numberOfFeaturesFrom?: number | string;
  numberOfFeaturesTo?: number | string;
  description: string;
  samples: string;
};