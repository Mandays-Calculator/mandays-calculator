import { render } from "@testing-library/react";
import { CheckboxGroup } from "~/components/form";
import userEvent from "@testing-library/user-event";
const options: SelectObject[] = [
  { value: "test1", label: "Test 1" },
  { value: "test2", label: "Test 2" },
];
describe("CheckBox Group Component", () => {
  it("renders checkbox group without crashing", () => {
    const { getByTestId, asFragment } = render(
      <CheckboxGroup
        options={options}
        name="checkbox-group-test"
      />
    );

    expect(getByTestId("checkbox-group-component")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with label", () => {
    const { getByTestId, asFragment } = render(
      <CheckboxGroup
        options={options}
        name="checkbox-group-test"
        label="label test"
      />
    );

    expect(getByTestId("checkbox-group-component")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders helper text", () => {
    const { getByTestId, asFragment } = render(
      <CheckboxGroup
        options={options}
        name="checkbox-group-test"
        helperText="Helper test"
      />
    );

    expect(getByTestId("checkbox-group-component")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("val single more than 1", () => {
    const options = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ];

    const mockOnChange = jest.fn();

    const { getAllByRole } = render(
      <CheckboxGroup
        name="test-checkbox"
        options={options}
        multiple={false}
        onChange={mockOnChange}
        value={["option1", "option2"]} // Assume multiple values are selected initially
      />
    );

    // Get the Checkbox components
    const checkboxes = getAllByRole("checkbox");

    // Unselect one of the checkboxes
    userEvent.click(checkboxes[0]);
  });

  it("val single not more than 1", () => {
    const options = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ];

    const mockOnChange = jest.fn();

    const { getAllByRole } = render(
      <CheckboxGroup
        name="test-checkbox"
        options={options}
        multiple={false}
        onChange={mockOnChange}
        value={[]} // Assume multiple values are selected initially
      />
    );

    // Get the Checkbox components
    const checkboxes = getAllByRole("checkbox");

    // Unselect one of the checkboxes
    userEvent.click(checkboxes[0]);
  });
});
