import { render } from "@testing-library/react";
import { CheckBox } from "~/components/form";

describe("CheckBox Component", () => {
  it("renders checkbox without crashing", () => {
    const { getByTestId, asFragment } = render(<CheckBox name="test-checkbox" />);
    const checkbox = getByTestId("checkbox-component");
    expect(checkbox).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders helper text", () => {
    const { getByTestId, asFragment } = render(
      <CheckBox
        name="test-checkbox"
        helperText="helper text"
      />
    );
    const checkbox = getByTestId("checkbox-component");
    expect(checkbox).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
