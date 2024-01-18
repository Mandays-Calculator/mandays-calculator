import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NotificationModal } from "~/components";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {},
  react: {
    useSuspense: false,
  },
});

beforeEach(() => {
  jest.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: jest.fn(),
    }),
  }));
});

describe("NotificationModal", () => {
  it("render idle timeout and click close button", () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <NotificationModal
        type="idleTimeOut"
        open={true}
        modalTitle="Error"
        onClose={onCloseMock}
        onCloseLabel="Close"
      />
    );

    const closeButton = getByTestId("close-button");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const onConfirmMock = jest.fn();
    const { getByTestId } = render(
      <NotificationModal
        open={true}
        onConfirm={onConfirmMock}
        modalTitle="Test header title"
      />
    );

    const confirmButton = getByTestId("confirm-button");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConfirmMock).toHaveBeenCalledTimes(1);
    });
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const onConfirmMock = jest.fn();
    const { getByTestId } = render(
      <NotificationModal
        type="success"
        open={true}
        onConfirm={onConfirmMock}
        modalTitle={<>Title</>}
      />
    );

    const confirmButton = getByTestId("confirm-button");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConfirmMock).toHaveBeenCalledTimes(1);
    });
  });
});
