import { ForGetComplexities } from "~/api/complexity";

export type FormContext = "" | "Add" | "Edit" | "Delete"

export type DataType = ForGetComplexities;

export type ComplexityForm = {
  complexityName: string;
  numberOfHoursFrom: number | string;
  numberOfHoursTo: number | string;
  numberOfFeaturesFrom: number | string;
  numberOfFeaturesTo: number | string;
  description: string;
  samples: string;
};

export type ComplexityFormsType = {
	formContext: FormContext;
	setContext: (context: FormContext) => void;
	complexityId: string;
	handleCloseAddEdit: () => void;
  data: ForGetComplexities[];
  setSuccessError: (sucErr: SucErrType) => void;
};

export type SucErrType = {
  isError: boolean;
  isAddError: boolean;
  isAddSuccess: boolean;
  isUpdateError: boolean;
  isUpdateSuccess: boolean;
  isDeleteError: boolean;
  isDeleteSuccess: boolean;
};
