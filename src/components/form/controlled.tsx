// import { TextField, CheckBox, CheckboxGroup, DatePicker } from ".";

import { CheckBox, CheckboxGroup, DatePicker, TextField } from ".";
import { withInputController } from "./hocs";
import Select from "./select/Select";

export const ControlledTextField = withInputController(TextField);
export const ControlledCheckBox = withInputController(CheckBox);
export const ControlledCheckBoxGroup = withInputController(
  CheckboxGroup,
  "checkbox-group"
) as typeof CheckboxGroup;
export const ControlledDatePicker = withInputController(DatePicker, "date-picker");
export const ControlledSelect = withInputController(Select);
