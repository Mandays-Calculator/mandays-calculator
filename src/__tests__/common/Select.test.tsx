import { render } from "@testing-library/react";
import { Select } from "~/components";

const options: SelectObject[] = [
  {
    label: "Test 1",
    value: "test1",
  },
  {
    label: "Test 2",
    value: "test2",
  },
];

describe("Select Component", () => {
  it("renders select without crashing", () => {
    const { getByTestId, asFragment } = render(
      <Select
        name="test-select"
        options={options}
      />
    );
    const selectElement = getByTestId("select-component");
    const placeholderElement = getByTestId("select-placeholder");

    expect(selectElement).toBeInTheDocument();
    expect(placeholderElement).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("render with option empty array", () => {
    const { getByTestId, asFragment, queryAllByRole } = render(
      <Select
        name="test-select"
        options={[]}
      />
    );
    const selectElement = getByTestId("select-component");
    expect(selectElement).toBeInTheDocument();
    const placeholderElement = getByTestId("select-placeholder");
    expect(placeholderElement).toBeInTheDocument();
    const options = queryAllByRole("option");
    expect(options).toHaveLength(0);
    expect(asFragment()).toMatchSnapshot();
  });

  it("multiple type", () => {
    const { getByTestId, asFragment } = render(
      <Select
        name="test-select-multiple"
        options={options}
        value={["value1"]}
        multiple
      />
    );

    const selectedComponent = getByTestId("select-component");
    expect(selectedComponent).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
