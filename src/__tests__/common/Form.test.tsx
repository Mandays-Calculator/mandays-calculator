import { render } from "@testing-library/react";
import { Formik, FormikInstance } from "formik";
import { Form } from "~/components";
import { ControlledTextField } from "~/components/form/controlled";
import { FormErrors } from "~/components/form/types";
import { getFieldError } from "~/components/form/utils";

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormik: jest.fn(),
}));

const formikInstance: FormikInstance<{ test: "" }> = {
  handleSubmit: jest.fn(),
  initialValues: {
    test: "",
  },
  values: {
    test: "",
  },
  errors: {},
  touched: {},
  setFieldValue: jest.fn(),
  setFieldTouched: jest.fn(),
  initialErrors: { test: "" },
  initialTouched: { test: "" },
  initialStatus: undefined,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleReset: jest.fn(),
  resetForm: jest.fn(),
  setErrors: jest.fn(),
  setFormikState: jest.fn(),
  setFieldError: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  setTouched: jest.fn(),
  setValues: jest.fn(),
  submitForm: jest.fn(),
  validateForm: jest.fn(),
  validateField: jest.fn(),
  isValid: false,
  dirty: false,
  unregisterField: jest.fn(),
  registerField: jest.fn(),
  getFieldProps: jest.fn(),
  getFieldMeta: jest.fn(),
  getFieldHelpers: jest.fn(),
  validateOnBlur: false,
  validateOnChange: false,
  validateOnMount: false,
  isSubmitting: false,
  isValidating: false,
  submitCount: 0,
};
describe("Form Component", () => {
  it("renders form component", () => {
    const { getByTestId } = render(
      <Formik
        initialValues={{}}
        onSubmit={() => {}}
      >
        {() => (
          <Form instance={formikInstance}>
            <ControlledTextField name="test" />
          </Form>
        )}
      </Formik>
    );

    const from = getByTestId("form-component");
    expect(from).toBeInTheDocument();
  });

  it("test getFieldError", () => {
    const errorObject: FormErrors | undefined = {
      test: "Error Message",
    };
    const getError = getFieldError(errorObject, "test");
    expect(getError).toBe("Error Message");
  });
});
