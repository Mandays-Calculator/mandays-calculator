import { useFormik } from "formik";
import type { ReactElement } from "react";
import { Form } from "~/components";
import {
  ControlledCheckBox,
  ControlledCheckBoxGroup,
  ControlledDatePicker,
  ControlledTextField,
} from "~/components/form/controlled";
interface TestForm {
  testing: string;
  dateTest: string;
  choice: boolean;
  groupChoice: string;
}
const AddProject = (): ReactElement => {
  const testForm = useFormik<TestForm>({
    initialValues: { testing: "", dateTest: "", choice: false, groupChoice: "" },
    onSubmit: (values) => console.log(values),
  });
  return (
    <div>
      <Form instance={testForm}>
        <ControlledTextField
          name="testing"
          label="Just a label"
          placeholder="Just a Placeholder"
        />
        <ControlledDatePicker name="dateTest" />
        <ControlledCheckBox
          name="choice"
          label="checkbox"
        />
        <ControlledCheckBoxGroup
          name="groupChoice"
          label="Group"
          options={[
            {
              label: "Test 1",
              value: "test",
            },
            {
              label: "Test 2",
              value: "test2",
            },
          ]}
        />

        <button type="submit"> Submit </button>
      </Form>
    </div>
  );
};

export default AddProject;
