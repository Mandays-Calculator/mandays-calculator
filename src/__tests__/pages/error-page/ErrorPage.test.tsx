import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorPage from "~/pages/common/error-page";

jest.mock("~/assets/img/page_not_found.png", () => "page_not_found.png");
jest.mock("~/assets/img/something_wrong.png", () => "something_wrong.png");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Error Page Component", () => {
  it("renders the page without breaking", () => {
    const { asFragment, getByText } = render(<ErrorPage type="not-found" />);

    expect(getByText("PAGE NOT FOUND")).toBeInTheDocument();
    expect(
      getByText("Couldn't find that. Try something else or go back home.")
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders something went wrong", () => {
    const { asFragment, getByText } = render(
      <ErrorPage type="something-went-wrong" />
    );
    expect(getByText("SOMETHING WENT WRONG")).toBeInTheDocument();
    expect(
      getByText(
        "Relax, you didn't break the internet. You may try refreshing the page."
      )
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("clicked go back button", () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigate);

    const { getByText } = render(
      <Router>
        <ErrorPage type="not-found" />
      </Router>
    );

    fireEvent.click(getByText("GO BACK HOME"));
    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
