// import { TextField, CheckBox, CheckboxGroup, DatePicker } from ".";

import { CheckBox, CheckboxGroup, DatePicker, TextField } from ".";
import { withInputController } from "./hocs";

export const ControlledTextField = withInputController(TextField);
export const ControlledCheckBox = withInputController(CheckBox);
export const ControlledCheckBoxGroup = withInputController(
  CheckboxGroup,
  "checkbox-group"
) as typeof CheckboxGroup;
export const ControlledDatePicker = withInputController(DatePicker, "date-picker");
