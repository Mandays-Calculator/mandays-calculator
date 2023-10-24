import { render } from "@testing-library/react";
import { SearchSelect } from "~/components/form";

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

describe("Search Select Component", () => {
  it("render the search select component", () => {
    const { getByTestId, asFragment } = render(
      <SearchSelect
        name="search-select-test"
        options={options}
      />
    );

    expect(getByTestId("search-select-component")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
