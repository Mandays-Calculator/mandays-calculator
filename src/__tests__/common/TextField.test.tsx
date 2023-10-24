import { render } from "@testing-library/react";
import { TextField } from "~/components";

describe("TextField Component", () => {
  it("renders without crashing", () => {
    const { getByTestId, asFragment } = render(<TextField name="test-textfield" />);
    const textField = getByTestId("text-field-component");
    expect(textField).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with label", () => {
    const { getByTestId, asFragment } = render(
      <TextField
        name="text-field-with-labe"
        label="sample label"
      />
    );

    const textField = getByTestId("text-field-component");
    expect(textField).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
