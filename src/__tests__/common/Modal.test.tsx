import { fireEvent, render } from "@testing-library/react";
import { Modal } from "~/components/modal";
import ProviderWrapper from "./utils/ProviderWrapper";
import Button from "@mui/material/Button";

jest.mock("~/hooks/modal", () => ({
  useDisableBodyScroll: jest.fn(),
}));

describe("Modal Component", () => {
  it("renders and matches snapshot", () => {
    const { asFragment } = render(
      <ProviderWrapper>
        <Modal open={true} title="Test Modal" onClose={() => {}} maxWidth="sm">
          <div>Modal content goes here</div>
        </Modal>
      </ProviderWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders actions when provided", () => {
    const onCloseMock = jest.fn();
    const actionText = "Action Button";

    const { getByText } = render(
      <ProviderWrapper>
        <Modal
          open={true}
          title="Test Modal"
          onClose={onCloseMock}
          maxWidth="sm"
          actions={<Button>{actionText}</Button>}
        >
          <div>Modal content goes here</div>
        </Modal>
      </ProviderWrapper>
    );

    expect(getByText(actionText)).toBeInTheDocument();
  });

  // Test for handling backdrop clicks
  it("closes on non-backdropClick reasons", () => {
    const onCloseMock = jest.fn();

    const { getByRole } = render(
      <ProviderWrapper>
        <Modal
          open={true}
          title="Test Modal"
          onClose={onCloseMock}
          maxWidth="sm"
        >
          <div>Modal content goes here</div>
        </Modal>
      </ProviderWrapper>
    );

    // Simulate the escape key down event
    fireEvent.keyDown(getByRole("dialog"), {
      key: "Escape",
      code: "Escape",
    });

    // Check if onClose was called
    expect(onCloseMock).toHaveBeenCalled();
  });
});
