import { CheckBox, CheckboxGroup, DatePicker, SearchSelect, TextField, NumberInput } from ".";
import { withInputController } from "./hocs";
import Select from "./select/Select";
import TextArea from "./text-area/TextArea";

export const ControlledTextField = withInputController(TextField);
export const ControlledCheckBox = withInputController(CheckBox);
export const ControlledTextArea = withInputController(TextArea);
export const ControlledCheckBoxGroup = withInputController(
  CheckboxGroup,
  "checkbox-group"
) as typeof CheckboxGroup;
export const ControlledDatePicker = withInputController(DatePicker, "date-picker");
export const ControlledSelect = withInputController(Select);
export const ControlledSearchSelect = withInputController(
  SearchSelect,
  "autocomplete"
) as typeof SearchSelect;
export const ControlledNumberInput = withInputController(NumberInput, "number-input");
