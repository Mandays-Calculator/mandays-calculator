import { render } from "@testing-library/react";
import Title from "~/components/title/Title";

describe("Title Component", () => {
  it("renders the title component", () => {
    const { getByTestId, asFragment } = render(
      <Title
        title="Title Component"
        color="primary"
      />
    );

    expect(getByTestId("title-component")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
