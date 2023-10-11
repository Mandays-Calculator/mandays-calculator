import { useFormik } from "formik";
import type { ReactElement } from "react";
import { Form } from "~/components";
import { ControlledTextField } from "~/components/form/controlled";
interface TestForm {
  testing: string;
}
const AddProject = (): ReactElement => {
  const testForm = useFormik<TestForm>({
    initialValues: { testing: "" },
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

        <button type="submit"> Submit </button>
      </Form>
    </div>
  );
};

export default AddProject;
