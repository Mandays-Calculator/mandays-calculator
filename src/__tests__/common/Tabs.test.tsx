import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomTab } from "~/components";

describe("CustomTabs", () => {
  it("renders correctly", () => {
    const tabs = [
      { label: "Tab 1", content: "Content 1" },
      { label: "Tab 2", content: "Content 2" },
    ];

    const { getByText } = render(<CustomTab tabs={tabs} />);

    expect(getByText("Tab 1")).toBeInTheDocument();
  });

  it("changes tab on click", () => {
    const tabs = [
      { label: "Tab 1", content: "Content 1" },
      { label: "Tab 2", content: "Content 2" },
    ];
    const onTabChangeMock = jest.fn();

    const { getByText } = render(
      <CustomTab tabs={tabs} onTabChange={onTabChangeMock} />
    );

    fireEvent.click(getByText("Tab 2"));

    expect(onTabChangeMock).toHaveBeenCalledWith(expect.anything(), 1);
  });

  it("displays the correct content for the selected tab", () => {
    const tabs = [
      { label: "Tab 1", content: "Content 1" },
      { label: "Tab 2", content: "Content 2" },
    ];

    const { getByText, queryByText } = render(<CustomTab tabs={tabs} />);

    expect(getByText("Content 1")).toBeInTheDocument();

    fireEvent.click(getByText("Tab 2"));

    expect(getByText("Content 2")).toBeInTheDocument();
    expect(queryByText("Content 1")).not.toBeInTheDocument();
  });
});
