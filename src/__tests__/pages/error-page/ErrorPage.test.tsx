import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorPage from "~/pages/common/error-page";
import { i18nMock } from "~/__tests__/__mocks__/i18nMocks";

jest.mock("~/assets/img/page_not_found.png", () => "page_not_found.png");
jest.mock("~/assets/img/something_wrong.png", () => "something_wrong.png");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Error Page Component", () => {
  it("renders the page without breaking", () => {
    const { common } = i18nMock;
    const { asFragment, getByText } = render(<ErrorPage type="not-found" />);

    expect(getByText(common.pageNotFoundTitle)).toBeInTheDocument();
    expect(getByText(common.pageNotFoundDesc)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders something went wrong", () => {
    const { common } = i18nMock;
    const { asFragment, getByText } = render(<ErrorPage type="something-went-wrong" />);
    expect(getByText(common.somethingWentWrongTitle)).toBeInTheDocument();
    expect(getByText(common.somethingWentWrongDesc)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders permission denied", () => {
    const { common } = i18nMock;
    const { asFragment, getByText } = render(<ErrorPage type="permission-error" />);
    expect(getByText(common.permissionDeniedTitle)).toBeInTheDocument();
    expect(getByText(common.somethingWentWrongDesc)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("clicked go back button", () => {
    const { common } = i18nMock;
    const navigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(navigate);

    const { getByText } = render(
      <Router>
        <ErrorPage type="not-found" />
      </Router>
    );

    fireEvent.click(getByText(common.goBackHomeBtnLabel));
    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
