import {
  CheckBox,
  CheckboxGroup,
  DatePicker,
  SearchSelect,
  TextField,
} from ".";
import DateTimePicker from "./date-time-picker/DateTimePicker";
import { withInputController } from "./hocs";
import Select from "./select/Select";

export const ControlledTextField = withInputController(TextField);
export const ControlledCheckBox = withInputController(CheckBox);
export const ControlledCheckBoxGroup = withInputController(
  CheckboxGroup,
  "checkbox-group"
) as typeof CheckboxGroup;
export const ControlledDatePicker = withInputController(
  DatePicker,
  "date-picker"
);
export const ControlledSelect = withInputController(Select);
export const ControlledSearchSelect = withInputController(
  SearchSelect,
  "autocomplete"
) as typeof SearchSelect;
export const ControlledDateTimePicker = withInputController(
  DateTimePicker,
  "date-time-picker"
);
