import { render } from "@testing-library/react";
import { Card } from "~/components";

describe("Card Component", () => {
  it("renders the component", () => {
    const { getByText, asFragment } = render(<Card title="Test">Card Content</Card>);

    expect(getByText("Test")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
