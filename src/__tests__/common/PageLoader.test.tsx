import { render } from "@testing-library/react";
import { PageLoader } from "~/components/page-loader";

describe("PageLoader component", () => {
  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(<PageLoader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
