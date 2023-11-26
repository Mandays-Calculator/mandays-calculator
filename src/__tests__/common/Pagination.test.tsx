import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "~/components";

describe("Pagination component", () => {
  it("renders undefined Pagination", () => {
    const { container } = render(<Pagination />);
    expect(container).toBeEmptyDOMElement();

  });
    
    it("renders the Pagination component", () => {
    const { getByLabelText } = render(<Pagination totalItems={10} itemsPerPage={5} />);
    expect(getByLabelText("Go to previous page")).toBeInTheDocument();
    expect(getByLabelText("page 1")).toBeInTheDocument();
    expect(getByLabelText("Go to page 2")).toBeInTheDocument();
    expect(getByLabelText("Go to next page")).toBeInTheDocument();
  });

  it("handles page change", async() => {
    const handleChangeMock = jest.fn();
    const { getByLabelText } = render(<Pagination totalItems={10} itemsPerPage={5} handleChange={handleChangeMock} />);

    const nextPageButton = getByLabelText("Go to next page");
    userEvent.click(nextPageButton);
    await waitFor(() => {
      expect(handleChangeMock).toHaveBeenCalled();
    })
  });
});