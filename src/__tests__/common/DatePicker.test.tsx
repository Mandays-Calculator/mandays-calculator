import { fireEvent, render } from "@testing-library/react";
import { DatePicker } from "~/components/form";

describe("Date Picker Component", () => {
  it("renders date picker component", () => {
    const { getByLabelText, asFragment } = render(
      <DatePicker
        name="date-picker"
        label="Date Picker"
      />
    );

    expect(getByLabelText("Date Picker")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("fire onChange", () => {
    const mockOnChange = jest.fn();

    const { getByLabelText, asFragment } = render(
      <DatePicker
        name="date-picker"
        label="Date Picker"
        onChange={mockOnChange}
      />
    );

    const inputField = getByLabelText("Date Picker");

    fireEvent.change(inputField, { target: { value: "2022-10-31" } });

    expect(inputField).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Date), expect.anything());
    expect(asFragment()).toMatchSnapshot();
  });
});
