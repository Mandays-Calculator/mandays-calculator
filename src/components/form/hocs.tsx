import type { ComponentType, ReactElement } from "react";
import type { FormikValues } from "formik";
import type {
  BaseInputProps,
  WithInputControllerType,
  WithInputControllerValueProp,
} from "./types";
import type { ReactDatePickerFunctionParams } from "../global-types/app";

import { useMemo } from "react";
import { useFormikContext, getIn, Field, FastField } from "formik";
import { isArray } from "lodash";

type WrappedInputProps<Type> = Type &
  BaseInputProps & {
    name: string;
  };
type WithInputController<Type extends object> = (props: WrappedInputProps<Type>) => ReactElement;

export const withInputController = <Type extends FormikValues>(
  WrappedInput: ComponentType<Type>,
  inputType: WithInputControllerType = "text"
): WithInputController<Type> => {
  return (props: WrappedInputProps<Type>): ReactElement => {
    const { name, isFastField, ...rest } = props;
    const form = useFormikContext<Type>();

    const fieldValue = form.values[name] || getIn(form.values, name);
    const fieldError = form.errors[name] || getIn(form.errors, name);
    const fieldTouched = form.touched[name] || getIn(form.touched, name);
    const hasError = Boolean(fieldError) && Boolean(fieldTouched);

    const handleInputNumberChange = (_: any, value: number): void => {
      form.setFieldValue(name, value);
    };

    const handleDateChange = (date: ReactDatePickerFunctionParams): void => {
      form.setFieldValue(name, date);
    };

    const handleDropzoneChange = (files: File[]): void => {
      form.setFieldValue(name, files);
    };

    const handlePinCodeChange = (pinCode: string): void => {
      form.setFieldValue(name, pinCode);
    };

    const handleCheckBoxChanges = (checkBoxName: string, checked: boolean): void => {
      if (checked) {
        form.setFieldValue(name, [checkBoxName, ...(form.values[name] ?? [])]);
      } else {
        const checkBoxData: string[] = [...form.values[name]];
        const index = checkBoxData.indexOf(checkBoxName);

        if (index !== -1) {
          checkBoxData.splice(index, 1);
          form.setFieldValue(name, checkBoxData);
        }
      }
    };

    const handleAutoComplete = (data: Type): void => {
      form.setFieldValue(name, data);
    };

    const getInputChange = ():
      | typeof handleDateChange
      | typeof handleDropzoneChange
      | typeof handlePinCodeChange
      | typeof handleCheckBoxChanges
      | typeof handleAutoComplete
      | typeof handleInputNumberChange
      | typeof form.handleChange => {
      switch (inputType) {
        case "date-picker":
          return handleDateChange;
        case "dropzone":
          return handleDropzoneChange;
        case "pin-code":
          return handlePinCodeChange;
        case "checkbox-group":
          return handleCheckBoxChanges;
        case "autocomplete":
          return handleAutoComplete;
        case "number-input":
          return handleInputNumberChange;
        default:
          return form.handleChange(name);
      }
    };

    const getInputValueProp = (): WithInputControllerValueProp => {
      if (inputType === "date-picker") {
        if (isArray(fieldValue)) {
          return {
            startDate: fieldValue[0],
            endDate: fieldValue[1],
          };
        }
        return {
          selected: fieldValue,
        };
      }

      return {
        value: fieldValue,
      };
    };

    const MemoriedField = useMemo(() => (isFastField ? FastField : Field), [isFastField]);
    return (
      <MemoriedField
        component={WrappedInput}
        name={name}
        error={hasError}
        {...getInputValueProp()}
        onChange={getInputChange()}
        {...(rest as Type)}
      />
    );
  };
};
